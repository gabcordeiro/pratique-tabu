export interface User {
  username: string;
  password: string;
}

export interface TabuadaAnswer {
  question: string;
  answer: number;
  correct: boolean;
}

export interface TabuadaRecord {
  date: string;
  number: number;
  attempts: number;
  correctAnswers: number;
  percentage: number;
  answers: TabuadaAnswer[];
}

export const getUsers = (): User[] =>
  JSON.parse(localStorage.getItem("users") || "[]");

export const saveUser = (user: User) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

export const findUser = (
  username: string,
  password: string
): User | undefined => {
  return getUsers().find(
    (u) => u.username === username && u.password === password
  );
};

export const saveHistory = (username: string, record: TabuadaRecord) => {
  const histories: Record<string, TabuadaRecord[]> = JSON.parse(
    localStorage.getItem("histories") || "{}"
  );
  if (!histories[username]) histories[username] = [];
  histories[username].push(record);
  localStorage.setItem("histories", JSON.stringify(histories));
};

export const getHistory = (username: string): TabuadaRecord[] => {
  const histories: Record<string, TabuadaRecord[]> = JSON.parse(
    localStorage.getItem("histories") || "{}"
  );
  return histories[username] || [];
};
