import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import numeral from 'numeral';
import { environment } from '../env/env';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private nombreNegocio = environment.nombreNegocio;
  constructor() { }

  simpleSuccessAlert(message: string): void {
    Swal.fire({
      title: this.nombreNegocio,
      text: message,
      icon: "success"
    });
  }

  simpleErrorAlert(message: string): void {
    Swal.fire({
      title: this.nombreNegocio,
      text: message,
      icon: "error"
    });
  }

  confirmAlert(title: string, message: string): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, estoy seguro",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  simpleInfoAlert(message: string) {
    Swal.fire({
      title: this.nombreNegocio,
      text: message,
      icon: "info"
    });
  }

  cancelarOperacionAlert(){
    Swal.fire({
      title: "Operación cancelada",
      text: "La operación fue cancelada",
      icon: "info"
    });
  }

  async simpleInputAlert(): Promise<number> {
    const { value: dinero } = await Swal.fire({
      title: "Ingrese con cuánto van a pagar",
      input: "text",
      inputLabel: "Total de dinero",
      inputPlaceholder: "",
      inputAttributes: {
        'aria-label': 'Ingrese el total de dinero'
      },
      didOpen: () => {
        const input = Swal.getInput();
        input!.addEventListener('input', () => {
          const value = numeral(input!.value).format('0,0');
          input!.value = value;
        });
      },
      preConfirm: (value) => {
        const numericValue = numeral(value).value();
        if (isNaN(numericValue!)) {
          Swal.showValidationMessage('Por favor, ingrese un número válido');
        }
        return numericValue;
      }
    });
  
    return dinero;
  }
}
