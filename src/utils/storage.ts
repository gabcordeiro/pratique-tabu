export interface User {
  username: string;
  password: string;
  email: string; // ✅ adicionamos email
  points?: number;
  anonymous?: boolean; // modo anônimo (sem login)
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

// Modo anônimo: o histórico fica só na sessão do navegador (sessionStorage)
export const ANONYMOUS_USERNAME = "Anônimo";

export const createAnonymousUser = (): User => ({
  username: ANONYMOUS_USERNAME,
  password: "",
  email: "",
  anonymous: true,
});

const historyStorage = (username: string): Storage =>
  username === ANONYMOUS_USERNAME ? sessionStorage : localStorage;

export const clearAnonymousHistory = () => {
  sessionStorage.removeItem("histories");
};

// Usuários
export const getUsers = (): User[] => {
  return JSON.parse(localStorage.getItem("users") || "[]");
};

export const saveUser = (user: User) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

export const findUser = (
  usernameOrEmail: string,
  password: string
): User | undefined => {
  return getUsers().find(
    (u) =>
      (u.username === usernameOrEmail || u.email === usernameOrEmail) &&
      u.password === password
  );
};

// Histórico
export const saveHistory = (username: string, record: TabuadaRecord) => {
  const storage = historyStorage(username);
  const histories: Record<string, TabuadaRecord[]> = JSON.parse(
    storage.getItem("histories") || "{}"
  );
  if (!histories[username]) histories[username] = [];
  histories[username].push(record);
  storage.setItem("histories", JSON.stringify(histories));
};

export const getHistory = (username: string): TabuadaRecord[] => {
  const histories: Record<string, TabuadaRecord[]> = JSON.parse(
    historyStorage(username).getItem("histories") || "{}"
  );
  return histories[username] || [];
};
