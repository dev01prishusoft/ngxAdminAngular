import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  settings = {
    actions: {
      edit: false,
      delete: true,
      add: false,
      custom: [
        {
          name: 'Edit',
          title:
            '<i class="nb-edit" data-toggle="tooltip" data-placement="top" title="edit"></i>',
        },
      ],
    },

    delete: {
      deleteButtonContent: '<i class="nb-trash" title="delete"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  constructor(private service: SmartTableData, private router: Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      let user = this.router.getCurrentNavigation().extras.state.user;
      user.forEach((element) => {
        const itemIndex = user.findIndex((o) => o.id === element.id);
        if (itemIndex > -1) {
          user[itemIndex] = element;
        } else {
          user = user.push(element);
        }
      });
      const uniqueUser = user.filter(
        (element, i) => i === user.indexOf(element)
      );
      this.source.load(uniqueUser);
    } else {
      const data = this.service.getData();
      this.source.load(data);
    }
  }

  ngOnInit(): void {}

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  addUser() {
    this.router.navigate(['/pages/users/Add-User']);
  }

  Edit(data) {
    let navigationExtras: NavigationExtras = {
      state: {
        Edituser: data.data,
      },
    };
    this.router.navigate(['/pages/users/Add-User'], navigationExtras);
  }
}
