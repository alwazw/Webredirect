-------------------
    WebRedirect
-------------------

Intro:

The index.html will load, collect the fingerprint data, send it to the Flask server, and then redirect to the desired url (here ex: Google.com). 
The collected data will be logged to fingerprints.log.
After starting the Flask app, navigate to http://localhost:8080 or (Server-IP:8080) in your browser. 
Verify fingerprint data was collected in fingerprints.log.

Folder Structure:

/home/webredirect
├── app.py
├── fingerprints.log
├── requirements.txt
├── static
│   └── js
│       └── fingerprint.js
└── templates
    └── index.html

1. Clone Repo

2. Install Dependencies:
sudo apt update && sudo apt install python3 python3-pip
pip install -r requirements.txt

3. Run app.py
python app.py

4. Visit redirect webpage:
http://localhost:8080 ---> will be automatically redirected to target site ex. google.com

4. Export 
browser fingerprint json located fingerprints.log

###
Next steps:
- Install MySQL
- Record collected datapoints in database in addition to fingerprints.log
