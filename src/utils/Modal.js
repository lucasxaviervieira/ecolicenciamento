/* A classe Modal no TypeScript representa uma janela modal com vários campos de entrada e métodos para
mostrar e fechar a janela modal. */
export default class Modal {
  constructor() {
    Object.defineProperty(this, "isOpen", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false,
    });
    Object.defineProperty(this, "modal", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: document.querySelector(".modal"),
    });
    Object.defineProperty(this, "body", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: document.querySelector(".body"),
    });
    Object.defineProperty(this, "myId", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: document.getElementById("myId"),
    });
    Object.defineProperty(this, "myIdInput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "",
    });
    Object.defineProperty(this, "area", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: document.getElementById("area"),
    });
    Object.defineProperty(this, "areaInput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "",
    });
    Object.defineProperty(this, "unit", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: document.getElementById("unit"),
    });
    Object.defineProperty(this, "unitInput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "",
    });
    Object.defineProperty(this, "subunit", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: document.getElementById("subunit"),
    });
    Object.defineProperty(this, "subunitInput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "",
    });
    Object.defineProperty(this, "requirementDate", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: document.getElementById("requirementDate"),
    });
    Object.defineProperty(this, "requirementDateInput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "",
    });
    Object.defineProperty(this, "control", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: document.getElementById("control"),
    });
    Object.defineProperty(this, "controlInput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "",
    });
    Object.defineProperty(this, "emitter", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: document.getElementById("emitter"),
    });
    Object.defineProperty(this, "emitterInput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "",
    });
    Object.defineProperty(this, "type", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: document.getElementById("type"),
    });
    Object.defineProperty(this, "typeInput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "",
    });
    Object.defineProperty(this, "specification", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: document.getElementById("specification"),
    });
    Object.defineProperty(this, "specificationInput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "",
    });
    Object.defineProperty(this, "licenseNumber", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: document.getElementById("licenseNumber"),
    });
    Object.defineProperty(this, "licenseNumberInput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "",
    });
    Object.defineProperty(this, "fcei", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: document.getElementById("fcei"),
    });
    Object.defineProperty(this, "fceiInput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "",
    });
    Object.defineProperty(this, "sinfat", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: document.getElementById("sinfat"),
    });
    Object.defineProperty(this, "sinfatInput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "",
    });
    Object.defineProperty(this, "sgpe", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: document.getElementById("sgpe"),
    });
    Object.defineProperty(this, "sgpeInput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "",
    });
    Object.defineProperty(this, "sei", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: document.getElementById("sei"),
    });
    Object.defineProperty(this, "seiInput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "",
    });
    Object.defineProperty(this, "emitterDate", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: document.getElementById("emitterDate"),
    });
    Object.defineProperty(this, "emitterDateInput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "",
    });
    Object.defineProperty(this, "dueDate", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: document.getElementById("dueDate"),
    });
    Object.defineProperty(this, "dueDateInput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "",
    });
    Object.defineProperty(this, "prevision", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: document.getElementById("prevision"),
    });
    Object.defineProperty(this, "previsionInput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "",
    });
    Object.defineProperty(this, "provideDoc", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: document.getElementById("provideDoc"),
    });
    Object.defineProperty(this, "provideDocInput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "",
    });
    Object.defineProperty(this, "requirement", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: document.getElementById("requirement"),
    });
    Object.defineProperty(this, "requirementInput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "",
    });
    Object.defineProperty(this, "protocolDate", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: document.getElementById("protocolDate"),
    });
    Object.defineProperty(this, "protocolDateInput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "",
    });
    Object.defineProperty(this, "newLicenseIssued", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: document.getElementById("newLicenseIssued"),
    });
    Object.defineProperty(this, "newLicenseIssuedInput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "",
    });
    Object.defineProperty(this, "responsibleSector", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: document.getElementById("responsibleSector"),
    });
    Object.defineProperty(this, "responsibleSectorInput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "",
    });
    Object.defineProperty(this, "processSituation", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: document.getElementById("processSituation"),
    });
    Object.defineProperty(this, "processSituationInput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "",
    });
    Object.defineProperty(this, "updatedSa", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: document.getElementById("updatedSa"),
    });
    Object.defineProperty(this, "updatedSaInput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "",
    });
    Object.defineProperty(this, "observations", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: document.getElementById("observations"),
    });
    Object.defineProperty(this, "observationsInput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "",
    });
  }
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
