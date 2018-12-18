import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: any = { };

  constructor(private service: UserService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe( data => {
      console.log(data);
      this.service.getUser( data.id )
        .subscribe((result) => {
          this.user = result;
          console.log(this.user);
        });

    });

  }

}
