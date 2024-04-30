### Immigrant-APP
 
![Technologies used](tecnologias.drawio.png)

It is an application developed in React for the WSO2 Challenger 2024.

This application communicates with Asgardeo for SSO and Federation with Google.

Asgardeo is used to register new users and can also use federated login with Google.

And with three APIS:

- BE-Citizen with MySQL;
- ViaCep (Proxy API);
- BE-Factory with PostegreSQL.

As a Scheduled Task:

- BE-Task-Cacelled with MySQL

![Diagram](diagrama_principal.drawio.png)

## Demo Utilization

URL APP: `https://app-fosbsb.choreoapps.dev`

*Admin:* 

Responsible for activating and deactivating users and checking all registrations.

Username: `demo.admin@hotmail.com`
Password: `ch4ll3ng3rWSO2`

*Provider:*

Responsible for paying a citizen who wants to help, you can choose one or more citizens and provide a donation with payment via credit card.

Username: `demo.provider@hotmail.com`
Password: `ch4ll3ng3rWSO2`

*Citizen:*

Register on the platform and monitor donations received.

Username: `demo.citizen@hotmail.com`
Password: `ch4ll3ng3rWSO2`