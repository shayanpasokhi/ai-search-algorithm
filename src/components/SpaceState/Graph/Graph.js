export class Graph {
  constructor() {
    this.vertices = [];
    this.adjacent = {};
    this.h = {};
    this.edges = 0;
  }

  addVertex(v, h = 0) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjacent[v] = [];
      this.h[v] = h;
    }
  }

  addEdge(v, w, g = 0) {
    if (this.vertices.includes(v)) {
      this.adjacent = {
        ...this.adjacent,
        [v]: { ...this.adjacent[v], [w]: g },
      };
      this.edges++;
    }
  }

  heapSort(arr, k) {
    let n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      this.heapify(arr, n, i, k);
    }

    for (let i = n - 1; i > 0; i--) {
      let temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;

      this.heapify(arr, i, 0, k);
    }
  }

  heapify(arr, n, i, k) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n && arr[l]?.[k] > arr[largest]?.[k]) {
      largest = l;
    }

    if (r < n && arr[r]?.[k] > arr[largest]?.[k]) {
      largest = r;
    }

    if (largest !== i) {
      let swap = arr[i];
      arr[i] = arr[largest];
      arr[largest] = swap;

      this.heapify(arr, n, largest, k);
    }
  }

  bfs(goal, start = this.vertices[0]) {
    let adj = this.adjacent;
    let tmp = [];

    let open = [start];
    let closed = [];

    while (open.length) {
      console.log("open: " + open.join(",") + " | closed: " + closed.join(","));

      let v = open.shift();

      if (v === goal) {
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
    let adj = this.adjacent;

    let open = [start];
    let closed = [];

    while (open.length) {
      console.log("open: " + open.join(",") + " | closed: " + closed.join(","));

      let v = open.shift();

      if (v === goal) {
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
    let adj = this.adjacent;

    let open = [{ v: start, f: 0 }];
    let closed = [];

    while (open.length) {
      console.log(
        "open: " +
          open.map((n) => n.v + n.f).join(",") +
          " | closed: " +
          closed.map((n) => n.v + n.f).join(",")
      );

      let { v, f } = open.shift();

      if (v === goal) {
        return true;
      }

      for (const child in adj[v]) {
        let isInOpen = open.some((n) => n.v === child);
        let isInClose = closed.some((n) => n.v === child);
        let newF = adj[v][child] + f;

        if (!isInOpen && !isInClose) {
          open.push({ v: child, f: newF });
          this.heapSort(open, "f");
        } else if (isInOpen) {
          let oldF = open.find((n) => n.v === child).f;

          if (newF < oldF) {
            open = open.map((n) => ({
              ...n,
              ...(n.v === child && { v: child, f: newF }),
            }));
            this.heapSort(open, "f");
          }
        } else if (isInClose) {
          let oldF = closed.find((n) => n.v === child).f;

          if (newF < oldF) {
            closed = closed.filter((n) => n.v !== child);
            open.push({ v: child, f: newF });
            this.heapSort(open, "f");
          }
        }
      }

      closed.unshift({ v, f });
    }

    return false;
  }

  aStar(goal, start = this.vertices[0]) {
    let adj = this.adjacent;

    let open = [{ v: start, f: this.h[start] + 0 }];
    let closed = [];

    while (open.length) {
      console.log(
        "open: " +
          open.map((n) => n.v + n.f).join(",") +
          " | closed: " +
          closed.map((n) => n.v + n.f).join(",")
      );

      let { v, f } = open.shift();

      if (v === goal) {
        return true;
      }

      for (const child in adj[v]) {
        let isInOpen = open.some((n) => n.v === child);
        let isInClose = closed.some((n) => n.v === child);
        let newF = adj[v][child] + f + this.h[child] - this.h[v];

        if (!isInOpen && !isInClose) {
          open.push({ v: child, f: newF });
          this.heapSort(open, "f");
        } else if (isInOpen) {
          let oldF = open.find((n) => n.v === child).f;

          if (newF < oldF) {
            open = open.map((n) => ({
              ...n,
              ...(n.v === child && { v: child, f: newF }),
            }));
            this.heapSort(open, "f");
          }
        } else if (isInClose) {
          let oldF = closed.find((n) => n.v === child).f;

          if (newF < oldF) {
            closed = closed.filter((n) => n.v !== child);
            open.push({ v: child, f: newF });
            this.heapSort(open, "f");
          }
        }
      }

      closed.unshift({ v, f });
    }

    return false;
  }
}
