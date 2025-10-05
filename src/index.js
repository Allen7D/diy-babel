const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');

const sourceCode = `
console.log(1);

function func() {
  console.info(2);
}

export default class Obj {
  say() {
    console.debug(3);
  }
  render() {
    return <div>{console.error(4)}</div>
  }
}
`

const ast = parser.parse(sourceCode, {
  sourceType: 'unambiguous',
  plugins: ['jsx']
})

traverse(ast, {
  CallExpression(path) { 
    // 访问表达式（可以访问对象）
    if (types.isMemberExpression(path.node.callee)) {
      const objectName = path.node.callee.object.name;
      const propertyName = path.node.callee.property.name;
      if (objectName === 'console' && ['log', 'info', 'error', 'debug'].includes(propertyName)) {
        const {line, column } = path.node.loc.start;
        // 插入“字符串字面量”节点
        const prefixStringLiteral = types.stringLiteral(`file: line: ${line}, column: ${column}`);
        path.node.arguments.unshift(prefixStringLiteral)
      }
    }
  }
})

const output = generate(ast, {}, sourceCode).code;
console.log('Output: \n\n', output);


