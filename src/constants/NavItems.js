const NavItems = [
  {
    id: "bfs",
    title: "جستجو اول سطح",
    isActive: true,
    g: false,
    h: false,
  },
  {
    id: "dfs",
    title: "جستجو اول عمق",
    isActive: false,
    g: false,
    h: false,
  },
  {
    id: "ucs",
    title: "جستجو با هزینه یکنواخت",
    isActive: false,
    g: true,
    h: false,
  },
  {
    id: "astar",
    title: "جستجو ای استار",
    isActive: false,
    g: true,
    h: true,
  },
];

export default NavItems;
