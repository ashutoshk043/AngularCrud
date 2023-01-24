import { FormGroup } from "@angular/forms";

export function mustMatch(password:string, confirmPassword : string){
    return(formGroup :FormGroup) => {
        const passwordControls = formGroup.controls['password'];
        const confirmPasswordControls = formGroup.controls['confirmPassword'];

        if(confirmPasswordControls.errors && !confirmPasswordControls.errors['match']){
            return;
        }
        if(passwordControls.value != confirmPasswordControls.value){
            confirmPasswordControls.setErrors({mustMatch :true});
        }else{
            confirmPasswordControls.setErrors(null);
        }
    }
}

// import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// export function mustMatch(password: string, confirmPassword: string): ValidatorFn {
//     return (ctrl: AbstractControl): ValidationErrors | null => {
//         const passwordControls = ctrl.get(password);
//         const confirmPasswordControls = ctrl.get(confirmPassword);

//         if (confirmPasswordControls?.errors && !confirmPasswordControls.errors['match']) {
//             return null;
//         }
//         if (passwordControls?.value != confirmPasswordControls?.value) {
//             confirmPasswordControls?.setErrors({ mustMatch: true });
//         }
//         else {
//             confirmPasswordControls?.setErrors(null);
//         }
//         return null;
//     }
// }