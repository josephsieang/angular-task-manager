import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UrlEncodingService } from 'src/app/url-encoding.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss'],
})
export class EditListComponent implements OnInit {
  oldTitle: string;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.oldTitle = params['listName'];
    });
  }

  editList(title: string): void {
    this.taskService.editList(title);
    this.router.navigate(['lists', title]);
  }

  cancel() {
    this.location.back();
  }
}
