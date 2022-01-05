import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, NavigationExtras, Route, Router } from '@angular/router';
import { SmartTableData } from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm = new FormGroup({
    id:new FormControl(""),
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    username: new FormControl(""),
    email: new FormControl(""),
    age: new FormControl(""),
   
  });
  constructor(private service: SmartTableData,private router:Router,private activatedRoute:ActivatedRoute) {
    if (this.router.getCurrentNavigation().extras.state) {
      let Edituser = this.router.getCurrentNavigation().extras.state.Edituser;
    console.log(Edituser)
    this.userForm.patchValue({  
      id: Edituser.id,  
      firstName: Edituser.firstName,  
      lastName: Edituser.lastName,   
      username: Edituser.username,  
      email: Edituser.email,  
      age: Edituser.age,  
  });  
       }
       else{
       
       }
  }
 
  ngOnInit(): void {
 
  }

  onSubmit() {
    console.warn(this.userForm.value);
      {
      const data = this.service.getData();
      data.push(this.userForm.value)
      let navigationExtras: NavigationExtras = {
        state: {
          user: data
        }
      };
      this.router.navigate(['/pages/users/All-users'], navigationExtras);
    }

  }

  Back(){
    this.router.navigate(['/pages/users/All-users']);
  }
}
