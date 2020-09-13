interface Player {
  id: string;
  x: number;
  y: number;
}

interface State {
  WORLD: {WIDTH: number, HEIGHT: number};
  players: Player[];
}