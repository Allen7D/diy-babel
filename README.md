```bash
@babel/core (核心调度器)
├── @babel/parser      (源码 → AST)
├── @babel/traverse    (遍历和修改 AST)
├── @babel/generator   (AST → 目标代码)
├── @babel/types       (AST 节点工具)
└── @babel/template    (代码模板工具)
```

`@babel/core` 整合所有其他包，提供统一的转换接口。
主要 API：transform、transformFile、transformAsync。