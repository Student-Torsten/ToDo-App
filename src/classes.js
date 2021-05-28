export class TodoListObject {
  constructor(text, status, id) {
    this.text = text;
    this.id = id;
    this.status = false;
    if (status !== undefined) {
      this.status = status;
    }
  }

  setDoneState(state) {
    this.status = state;
  }
}
