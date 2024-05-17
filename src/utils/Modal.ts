/* A classe Modal no TypeScript representa uma janela modal com vários campos de entrada e métodos para
mostrar e fechar a janela modal. */
export default class Modal {
  isOpen: boolean = false;
  modal: HTMLInputElement | null = document.querySelector(
    ".modal"
  ) as HTMLInputElement;
  body: HTMLInputElement | null = document.querySelector(
    ".body"
  ) as HTMLInputElement;

  myId: HTMLInputElement | null = document.getElementById(
    "myId"
  ) as HTMLInputElement;
  myIdInput: string = "";

  area: HTMLInputElement | null = document.getElementById(
    "area"
  ) as HTMLInputElement;
  areaInput: string = "";

  unit: HTMLInputElement | null = document.getElementById(
    "unit"
  ) as HTMLInputElement;
  unitInput: string = "";

  subunit: HTMLInputElement | null = document.getElementById(
    "subunit"
  ) as HTMLInputElement;
  subunitInput: string = "";

  requirementDate: HTMLInputElement | null = document.getElementById(
    "requirementDate"
  ) as HTMLInputElement;
  requirementDateInput: string = "";

  control: HTMLInputElement | null = document.getElementById(
    "control"
  ) as HTMLInputElement;
  controlInput: string = "";

  emitter: HTMLInputElement | null = document.getElementById(
    "emitter"
  ) as HTMLInputElement;
  emitterInput: string = "";

  type: HTMLInputElement | null = document.getElementById(
    "type"
  ) as HTMLInputElement;
  typeInput: string = "";

  specification: HTMLInputElement | null = document.getElementById(
    "specification"
  ) as HTMLInputElement;
  specificationInput: string = "";

  licenseNumber: HTMLInputElement | null = document.getElementById(
    "licenseNumber"
  ) as HTMLInputElement;
  licenseNumberInput: string = "";

  fcei: HTMLInputElement | null = document.getElementById(
    "fcei"
  ) as HTMLInputElement;
  fceiInput: string = "";

  sinfat: HTMLInputElement | null = document.getElementById(
    "sinfat"
  ) as HTMLInputElement;
  sinfatInput: string = "";

  sgpe: HTMLInputElement | null = document.getElementById(
    "sgpe"
  ) as HTMLInputElement;
  sgpeInput: string = "";

  sei: HTMLInputElement | null = document.getElementById(
    "sei"
  ) as HTMLInputElement;
  seiInput: string = "";

  emitterDate: HTMLInputElement | null = document.getElementById(
    "emitterDate"
  ) as HTMLInputElement;
  emitterDateInput: string = "";

  dueDate: HTMLInputElement | null = document.getElementById(
    "dueDate"
  ) as HTMLInputElement;
  dueDateInput: string = "";

  prevision: HTMLInputElement | null = document.getElementById(
    "prevision"
  ) as HTMLInputElement;
  previsionInput: string = "";

  provideDoc: HTMLInputElement | null = document.getElementById(
    "provideDoc"
  ) as HTMLInputElement;
  provideDocInput: string = "";

  requirement: HTMLInputElement | null = document.getElementById(
    "requirement"
  ) as HTMLInputElement;
  requirementInput: string = "";

  protocolDate: HTMLInputElement | null = document.getElementById(
    "protocolDate"
  ) as HTMLInputElement;
  protocolDateInput: string = "";

  newLicenseIssued: HTMLInputElement | null = document.getElementById(
    "newLicenseIssued"
  ) as HTMLInputElement;
  newLicenseIssuedInput: string = "";

  responsibleSector: HTMLInputElement | null = document.getElementById(
    "responsibleSector"
  ) as HTMLInputElement;
  responsibleSectorInput: string = "";

  processSituation: HTMLInputElement | null = document.getElementById(
    "processSituation"
  ) as HTMLInputElement;
  processSituationInput: string = "";

  updatedSa: HTMLInputElement | null = document.getElementById(
    "updatedSa"
  ) as HTMLInputElement;
  updatedSaInput: string = "";

  observations: HTMLInputElement | null = document.getElementById(
    "observations"
  ) as HTMLInputElement;
  observationsInput: string = "";

  showMe() {
    this.isOpen = true;
    if (this.modal) {
      this.modal.classList.remove("hidden");
    }
    if (this.body) {
      this.body.classList.add("overflow-hidden");
    }
    if (this.myId) {
      this.myId.innerText = this.myIdInput;
    }
    if (this.area) {
      this.area.value = this.areaInput;
    }
    if (this.unit) {
      this.unit.value = this.unitInput;
    }
    if (this.subunit) {
      this.subunit.value = this.subunitInput;
    }
    if (this.requirementDate) {
      this.requirementDate.value = this.requirementDateInput;
    }
    if (this.control) {
      this.control.value = this.controlInput;
    }
    if (this.emitter) {
      this.emitter.value = this.emitterInput;
    }
    if (this.type) {
      this.type.value = this.typeInput;
    }
    if (this.specification) {
      this.specification.value = this.specificationInput;
    }
    if (this.licenseNumber) {
      this.licenseNumber.value = this.licenseNumberInput;
    }
    if (this.fcei) {
      this.fcei.value = this.fceiInput;
    }
    if (this.sinfat) {
      this.sinfat.value = this.sinfatInput;
    }
    if (this.sgpe) {
      this.sgpe.value = this.sgpeInput;
    }
    if (this.sei) {
      this.sei.value = this.seiInput;
    }
    if (this.emitterDate) {
      this.emitterDate.value = this.emitterDateInput;
    }
    if (this.dueDate) {
      this.dueDate.value = this.dueDateInput;
    }
    if (this.prevision) {
      this.prevision.value = this.previsionInput;
    }
    if (this.provideDoc) {
      this.provideDoc.value = this.provideDocInput;
    }
    if (this.requirement) {
      this.requirement.value = this.requirementInput;
    }
    if (this.protocolDate) {
      this.protocolDate.value = this.protocolDateInput;
    }
    if (this.newLicenseIssued) {
      this.newLicenseIssued.value = this.newLicenseIssuedInput;
    }
    if (this.responsibleSector) {
      this.responsibleSector.value = this.responsibleSectorInput;
    }
    if (this.processSituation) {
      this.processSituation.value = this.processSituationInput;
    }
    if (this.updatedSa) {
      this.updatedSa.value = this.updatedSaInput;
    }
    if (this.observations) {
      this.observations.value = this.observationsInput;
    }
  }

  closeMe() {
    this.isOpen = false;

    if (this.modal) {
      this.modal.classList.add("hidden");
    }
    if (this.body) {
      this.body.classList.remove("overflow-hidden");
    }
  }
}
