import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { apiHttpService } from '../http-service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  serverUrl = "http://localhost:3000";
  users: any = [];
  userId: string | undefined;
  closeButtonText = "Close Add User Form";
  inputDisable = false;
  emailDisable = false;
  isUserAvailable = false;
  isAddUser = false;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  error: String | undefined;
  fileToUpload: File | null = null;
  fileName: string | undefined;

  constructor(
    private apiService: apiHttpService
  ) {}

  ngOnInit() {
    if (this.users.length) this.isUserAvailable = true;
    this.getUsers();
  }

  closeForm() {
    this.fileName = undefined;
    this.inputDisable = false;
    this.emailDisable = false;  
    this.isAddUser = false;
    this.firstName = undefined;
    this.lastName = undefined;
    this.email = undefined;
    this.phoneNumber = undefined;
  }

  addUser() {    
    this.apiService.addUser(`${this.serverUrl}/user`, {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      profileImage: this.fileName
    }).subscribe((response: any) => {
      if (!response.status) {
        this.error = "Something Went Wrong";
      }
    });
    this.getUsers();
    this.closeForm();
  }

  getUsers() {
    this.apiService.getUsers(`${this.serverUrl}/users`).subscribe((response: any) => {
      if (!response.status) {
        this.error = "Something Went Wrong";
      }
      this.users = response.data;
      if (!this.users.length) {
        this.isUserAvailable = false;
      } else {
        this.isUserAvailable = true;
      }
    });
  }

  getUserDetail(user: any) {
    this.closeForm();
    this.firstName = user?.firstName;
    this.lastName = user?.lastName;
    this.email = user?.email;
    this.phoneNumber = user?.phoneNumber;
    this.fileName = user?.profileImage;
    this.isAddUser = true;
    this.inputDisable = true;
    this.emailDisable = true;
    this.closeButtonText = "Close User Detail Form"
  }


  updateUserDetail(user: any) {
    this.closeForm();
    this.userId = user._id;
    this.firstName = user?.firstName;
    this.lastName = user?.lastName;
    this.email = user?.email;
    this.phoneNumber = user?.phoneNumber;
    this.fileName = user?.profileImage;
    this.isAddUser = true;
    this.emailDisable = true;
    this.closeButtonText = "Close User Update Form"
  }

  updateUser() {
    this.apiService.updateUser(`${this.serverUrl}/user/${this.userId}`, {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      profileImage: this.fileName
    }).subscribe((response: any) => {
      if (!response.status) {
        this.error = "Something Went Wrong";
      }
    });
    this.getUsers();
    this.closeForm();

  }

  deleteUser(userId: string) {
    this.apiService.deleteUser(`${this.serverUrl}/user/${userId}`).subscribe((response: any) => {
      if (!response.status) {
        this.error = "Something Went Wrong";
      }
    });
    this.closeForm();
    this.getUsers();
  }

  pickImage(event: any) {
    if (event.target?.files && event.target?.files[0]) {
      let doc = event.target.files[0];
      let fileName = doc.name;
      this.apiService.uploadImage(`${this.serverUrl}/user/picture`, doc).subscribe((response: any) => {
        if (!response.status) {
          this.error = "Something Went Wrong";
        }
        this.fileName = response.data.name
      });
    }
  }

}
