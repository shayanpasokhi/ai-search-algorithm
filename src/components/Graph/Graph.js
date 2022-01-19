export class Graph {
  constructor() {
    this.vertices = [];
    this.adjacent = {};
    this.h = {};
    this.edges = 0;
    this.res = { open: [], closed: [] };
  }

  addVertex(v, h = 0) {
    v = v.toUpperCase();

    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjacent[v] = [];
      this.h[v] = parseInt(h);
    }
  }

  addEdge(v, w, g = 0) {
    v = v.toUpperCase();
    w = w.toUpperCase();

    if (this.vertices.includes(v)) {
      this.adjacent = {
        ...this.adjacent,
        [v]: { ...this.adjacent[v], [w]: parseInt(g) },
      };
      this.edges++;
    }
  }

  minHeapSort(arr, k1, k2) {
    arr.sort((a, b) =>
      a[k1] === b[k1]
        ? a[k2] < b[k2]
          ? -1
          : a[k2] > b[k2]
          ? 1
          : 0
        : a[k1] - b[k1]
    );
  }

  bfs(goal, start = this.vertices[0]) {
    if (!Array.isArray(goal)) goal = [goal];
    goal = goal.map((g) => g.toUpperCase());

    let adj = this.adjacent;
    let tmp = [];

    let open = [start];
    let closed = [];

    while (open.length) {
      console.log("open: " + open.join(",") + " | closed: " + closed.join(","));

      let v = open.shift();

      if (goal.includes(v)) {
        return true;
      }

      closed.unshift(v);
      tmp = [];

      for (const child in adj[v]) {
        if (![...open, ...tmp].includes(child) && !closed.includes(child)) {
          tmp.push(child);
        }
      }

      if (tmp.length) {
        tmp.sort();
        open = [...open, ...tmp];
      }
    }

    return false;
  }

  dfs(goal, start = this.vertices[0]) {
    if (!Array.isArray(goal)) goal = [goal];
    goal = goal.map((g) => g.toUpperCase());

    let adj = this.adjacent;

    let open = [start];
    let closed = [];

    while (open.length) {
      console.log("open: " + open.join(",") + " | closed: " + closed.join(","));

      let v = open.shift();

      if (goal.includes(v)) {
        return true;
      }

      closed.unshift(v);
      let tmp = [];

      for (const child in adj[v]) {
        if (![...open, ...tmp].includes(child) && !closed.includes(child)) {
          tmp.push(child);
        }
      }

      if (tmp.length) {
        tmp.sort();
        open = [...tmp, ...open];
      }
    }

    return false;
  }

  ucs(goal, start = this.vertices[0]) {
    if (!Array.isArray(goal)) goal = [goal];
    goal = goal.map((g) => g.toUpperCase());

    let adj = this.adjacent;

    let open = [{ v: start, f: 0 }];
    let closed = [];

    while (open.length) {
      console.log(
        "open: " +
          open.map((n) => n.v + "(" + n.f + ")").join(",") +
          " | closed: " +
          closed.map((n) => n.v + "(" + n.f + ")").join(",")
      );

      let { v, f } = open.shift();

      if (goal.includes(v)) {
        return true;
      }

      for (const child in adj[v]) {
        let isInOpen = open.some((n) => n.v === child);
        let isInClose = closed.some((n) => n.v === child);
        let newF = adj[v][child] + f;

        if (!isInOpen && !isInClose) {
          open.push({ v: child, f: newF });
          this.minHeapSort(open, "f", "v");
        } else if (isInOpen) {
          let oldF = open.find((n) => n.v === child).f;

          if (newF < oldF) {
            open = open.map((n) => ({
              ...n,
              ...(n.v === child && { v: child, f: newF }),
            }));
            this.minHeapSort(open, "f", "v");
          }
        } else if (isInClose) {
          let oldF = closed.find((n) => n.v === child).f;

          if (newF < oldF) {
            closed = closed.filter((n) => n.v !== child);
            open.push({ v: child, f: newF });
            this.minHeapSort(open, "f", "v");
          }
        }
      }

      closed.unshift({ v, f });
    }

    return false;
  }

  aStar(goal, start = this.vertices[0]) {
    if (!Array.isArray(goal)) goal = [goal];
    goal = goal.map((g) => g.toUpperCase());

    let adj = this.adjacent;

    let open = [{ v: start, f: this.h[start] + 0 }];
    let closed = [];

    while (open.length) {
      console.log(
        "open: " +
          open.map((n) => n.v + "(" + n.f + ")").join(",") +
          " | closed: " +
          closed.map((n) => n.v + "(" + n.f + ")").join(",")
      );

      let { v, f } = open.shift();

      if (goal.includes(v)) {
        return true;
      }

      for (const child in adj[v]) {
        let isInOpen = open.some((n) => n.v === child);
        let isInClose = closed.some((n) => n.v === child);
        let newF = adj[v][child] + f + this.h[child] - this.h[v];

        if (!isInOpen && !isInClose) {
          open.push({ v: child, f: newF });
          this.minHeapSort(open, "f", "v");
        } else if (isInOpen) {
          let oldF = open.find((n) => n.v === child).f;

          if (newF < oldF) {
            open = open.map((n) => ({
              ...n,
              ...(n.v === child && { v: child, f: newF }),
            }));
            this.minHeapSort(open, "f", "v");
          }
        } else if (isInClose) {
          let oldF = closed.find((n) => n.v === child).f;

          if (newF < oldF) {
            closed = closed.filter((n) => n.v !== child);
            open.push({ v: child, f: newF });
            this.minHeapSort(open, "f", "v");
          }
        }
      }

      closed.unshift({ v, f });
    }

    return false;
  }
}
