export default function animation (node, className="", timeOut=5000) {
  node.classList.add(className);
  setTimeout(() => {
    node.classList.remove(className)
  }, timeOut)
}