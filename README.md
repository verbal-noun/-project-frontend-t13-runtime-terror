# Runtime Terror Front-end Repository
## INFO30005 Deliverable 3 - Frontend + Backend (Customer App)

## Team: Runtime Terror

### Tutor: Xiao Han

### Tutorial day and time: Wednesday 11 am

### Team number: 13

### Team Members:

| Name     | Student ID | Email                               |
| -------- | ---------- | ----------------------------------- |
| Kaif     | 1068214    | kahsan@student.unimelb.edu.au       |
| Kamyar   | 1068176    | kkarimifakhr@student.unimelb.edu.au |
| Keith    | 1118943    | kleonardo@student.unimelb.edu.au    |
| Hasan    | 1118853    | sohi@student.unimelb.edu.au         |
| Mitchell | 823604     | mneedham@student.unimelb.edu.au     |

## Tech Stack

| Front-end | Back-end|
| --------- | ------- |
| Figma | Node.js|
| Canva | MongoDB|
| React.js | MongoDB Atlas |
| CSS | MongoDB Compass |
| Bootstrap | Postman |

### MongoDB
MongoDB connection string:

    mongodb+srv://root:testtest@cluster0.iyw6v.mongodb.net/snacksInAVan?retryWrites=true&w=majority


## Heruko URL
| App | Front-end | Back-end |
| --- | --------- | -------- |
| Customer | https://info30005-customer-frontend.herokuapp.com | https://info30005-customer-backend.herokuapp.com/ |
| Vendor | https://info30005-vendor-frontend.herokuapp.com/ | https://info30005-vendor-backend.herokuapp.com/ |


## How to run the websites
#### Customer Website
From the root directory, go to the customer folder:

        cd customer

Install the required packages:

        npm install

To run the customer website type:

        npm start


#### Vendor Website
From the root directory, go to the vendor folder:

        cd vendor

Install the required packages:

        npm install

To run the vendor website type:

        npm start

## Credentials

#### Customer

| Email           | Password |
| --------------- | -------- |
| random@test.com | 1234567e |
| kamy@elon       | 1234ASDF |

#### Vendor

| Name        | Password |
| ----------- | -------- |
| Test-Vendor | 1234567E |
| Hannah      | 1234     |

### Example Screenshots of various pages

**Home Page**: Lists nearest 5 vans and displays those on Google map. If the customer doesn't share location then Homepage will show the default page overlooking Melbourne CBD. Logged-in view will display the button to view orders.
* Home Page (Default/not logged in)
    <img src="resources/homepagedefault.png" alt="Find a van page. Nearest 5 vans listed and displayed on the map">
* Home Page (Logged in)
    <img src="resources/hopmepageloggedin.png" alt="Find a van page. Nearest 5 vans listed and displayed on the map">


**Van Page**: Clicking a van from the home page will redirect to Van page where a customer can see the menu and add to to order.
-   <img src="resources/vanpage.png" alt="Van Page">

**Order Status Page**: Order status page shows the items ordered and the total payable amount.
- <img src="resources/orderstatus.png" alt="Order Status Page">










### Other Information:
-   Icon and logo images taken from [unsplash](https://unsplash.com/) and [canva](https://www.canva.com/)
-   Back-end repository link: https://github.com/INFO30005-2021-SM1/project-frontend-t13-runtime-terror
