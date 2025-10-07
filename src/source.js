console.log(1-1);

function func() {
  console.info(2);
}

console.log(1-2);

export default class Obj {
  say() {
    console.debug(3);
  }
  render() {
    return <div>{console.error(4)}</div>
  }
}