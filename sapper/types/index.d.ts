declare interface ImportMeta {
  hot: {
    accept(path?: () => void, callback?: () => void): void;
    dispose(path?: () => void, callback?: () => void): void;
  };
}
