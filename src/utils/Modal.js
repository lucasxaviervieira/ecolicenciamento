/* A classe Modal no TypeScript representa uma janela modal com vários campos de entrada e métodos para
mostrar e fechar a janela modal. */
export default class Modal {
  constructor() {
    this.isOpen = false;
    this.modal = document.querySelector(".modal");
    this.body = document.querySelector(".body");

    this.elements = this.getElements();
    this.inputs = this.initializeInputs();
  }

  getElements() {
    const ids = [
      "myId",
      "area",
      "unit",
      "subunit",
      "requirementDate",
      "control",
      "emitter",
      "type",
      "specification",
      "licenseNumber",
      "fcei",
      "sinfat",
      "sgpe",
      "sei",
      "emitterDate",
      "dueDate",
      "prevision",
      "provideDoc",
      "requirement",
      "protocolDate",
      "newLicenseIssued",
      "responsibleSector",
      "processSituation",
      "updatedSa",
      "observations",
    ];
    const elements = {};
    ids.forEach((id) => (elements[id] = document.getElementById(id)));
    return elements;
  }

  initializeInputs() {
    const inputFields = [
      "myIdInput",
      "areaInput",
      "unitInput",
      "subunitInput",
      "requirementDateInput",
      "controlInput",
      "emitterInput",
      "typeInput",
      "specificationInput",
      "licenseNumberInput",
      "fceiInput",
      "sinfatInput",
      "sgpeInput",
      "seiInput",
      "emitterDateInput",
      "dueDateInput",
      "previsionInput",
      "provideDocInput",
      "requirementInput",
      "protocolDateInput",
      "newLicenseIssuedInput",
      "responsibleSectorInput",
      "processSituationInput",
      "updatedSaInput",
      "observationsInput",
    ];
    const inputs = {};
    inputFields.forEach((field) => (inputs[field] = ""));
    return inputs;
  }

  showMe() {
    this.isOpen = true;
    if (this.modal) this.modal.classList.remove("hidden");
    if (this.body) this.body.classList.add("overflow-hidden");

    Object.keys(this.inputs).forEach((key) => {
      const elementKey = key.replace("Input", "");
      if (this.elements[elementKey]) {
        this.elements[elementKey].value = this.inputs[key];
      }
    });
  }

  closeMe() {
    this.isOpen = false;
    if (this.modal) this.modal.classList.add("hidden");
    if (this.body) this.body.classList.remove("overflow-hidden");
  }
}
