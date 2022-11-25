const DNA_TOKEN = 'DNA_ACCESS_TOKEN';

export function setTokenItem(token: string) {
  sessionStorage.setItem(DNA_TOKEN, token);
}

export function getTokenItem() {
  return sessionStorage.getItem(DNA_TOKEN);
}

export function clearToeknItemAll(token: string) {
  sessionStorage.clear();
}
