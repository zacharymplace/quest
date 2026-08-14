export function getQuestPath({
  startId,
  graph
}) {
  const nodes =
    new Map(
      graph.map(
        (node) => [
          node.id,
          node
        ]
      )
    );

  const path = [];

  let current =
    nodes.get(
      startId
    );

  while (current) {
    path.push(
      current
    );

    current =
      nodes.get(
        current.next[0]
      );
  }

  return path;
}
