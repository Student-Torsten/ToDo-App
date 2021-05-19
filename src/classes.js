export class listObject {
  constructor(text, status) {
    this.text = text;

    this.status = false;
    if (status !== undefined) {
      this.status = status;
    }
  }

  setDoneState(state) {
    this.status = state;
  }
}
