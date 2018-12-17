import { Component } from '@angular/core';

// add imports
import { UserService } from './user.service';
import { FormGroup } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myApp';

  users: Array<any> = [];
  userId = null;
  displayForm : boolean = false;

  constructor(private service: UserService, private toastr: ToastrManager) {

    this.service.getUsers()
      .subscribe((data) => {
        this.users = data;
        console.log(this.users);
        this.onForm();
      });

    this.service.selectedUser = {
      "id": null,
      "name": '',
      "email": '',
      "password": ''
    };

  }

  public onForm() {

    if (this.users.length > 0) {

      this.displayForm = true;
      return;

    } 
    this.displayForm = false;

  }

  public onSubmit(form: FormGroup) {

    console.log(form.value);

    if( form.value.id == null ) {

      this.service.postUser(form.value)
        .subscribe((resp) => {
          console.log(resp);
          
          if(resp["status"] == 201) {

            this.clearForm();

            this.service.getUsers()
              .subscribe((data) => {
                this.users = data;
                this.onForm();
                this.toastr.successToastr("Novo usuário adicionado", "Success!");
              });
            
          }

        });

    } else {

        this.service.putUser(form.value)
          .subscribe((resp) => {
            console.log(resp);
            if(resp["status"] == 200) {
              this.clearForm();
              this.onForm();
              this.updateList(form.value);
              this.toastr.infoToastr("As informações foram atualizadas com sucesso!", "Update!")
            }
          });

    }


  }

  public onEdit(id: string) {

    this.service.getUser(id)
      .subscribe((data) => {
        this.service.selectedUser = data;
      });

  }
  
  public updateList(user: any) {

    for(var i = 0; i < this.users.length; i++) {

      if(user.id == this.users[i].id) {
        this.users[i] = user;
        return;
      }

    }

  }

  public deleteConfirm(id: string) {

    this.userId = id;
    console.log("pronto para ser excluído");

  }

  public cancelDelete() {
    this.userId = null;
    console.log("área de exclusão cancelada.");
  }

  public onDelete() {

    if(this.userId != null) {

      this.service.deleteUser(this.userId)
      .subscribe((resp) => {
        console.log(resp);
        if(resp['status'] == 200) {

          this.users = this.users.filter((user) => user.id != this.userId);
          this.cancelDelete();
          this.onForm();
          this.toastr.warningToastr("As informações foram excluídas com sucesso!", "Delete!");

        }
      });

    }

  }

  public clearForm() {

    this.service.selectedUser = {
      "id": null,
      "name": '',
      "email": '',
      "password": ''
    };

  }


}
