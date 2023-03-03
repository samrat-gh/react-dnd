const itemTypes = {
  Card: "card",
};

export default itemTypes;

export type Task = {
  title: string;
  description: string;
  id: number;
  status: boolean;
};
