export interface SetStorage {
  set: (input: SetStorage.Input) => void
}

export namespace SetStorage {
  export type Input = { key: string, value: object }
}
