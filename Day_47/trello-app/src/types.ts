export type Id = string | number;

export type Column = {
  column: Id;
  columnName: string;
};

export type Task = {
  _id: Id;
  column: Id;
  content: string;
};
