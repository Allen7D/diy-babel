let index = 1;

module.exports = function ({ types, template }) {
  return {
    visitor: {
      CallExpression(path) {
        // 访问表达式（可以访问对象）
        if (types.isMemberExpression(path.node.callee)) {
          const objectName = path.node.callee.object.name;
          const propertyName = path.node.callee.property.name;
          if (
            objectName === "console" &&
            ["log", "info", "error", "debug"].includes(propertyName)
          ) {
            // 展示 path 对应的内容
            // console.log('path: ', generate(path.node).code);

            if (path.node.loc == null) return;
            const { line, column } = path.node.loc.start;
            // 将表达式代码模板（如 console.log("...")）转换成 AST 节点构造函数
            const newNode = template.expression(
              `console.log("file(index: ${index++}): line: ${line}, column: ${column}")`
            )();
            if (path.findParent((p) => p.isJSXElement())) {
              path.replaceWith(types.arrayExpression([newNode, path.node]));
              path.skip();
            } else {
              path.insertBefore(newNode);
            }
          }
        }
      },
    },
  };
};
