export class Text {
  static capitalize(text) {
    if (!text) {
      return "";
    }

    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  static initials(text, glue = true) {
    const initials = text.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g);

    if (glue) {
      return (initials ?? []).join("");
    }

    return Array.from(initials ?? []);
  }

  static splitAt(index, text) {
    return [text.substring(0, index), text.substring(index)];
  }
}
