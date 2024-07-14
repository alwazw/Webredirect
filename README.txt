README.txt

Structure

/home/alwazw/test_dir
├── app.py
├── app.pyold
├── fingerprints.log
├── flask.log
├── nohup.out
├── requirements.txt
├── static
│   └── js
│       └── fingerprint.js
└── templates
    └── index.html

-- Create Folders
cd
mkdir webredirect
mkdir -p "$BASE_DIR/static/js"
mkdir -p "$BASE_DIR/templates"

-- Create the files
touch "$BASE_DIR/app.py"
touch "$BASE_DIR/app.pyold"
touch "$BASE_DIR/fingerprints.log"
touch "$BASE_DIR/flask.log"
touch "$BASE_DIR/nohup.out"
touch "$BASE_DIR/requirements.txt"
touch "$BASE_DIR/static/js/fingerprint.js"
touch "$BASE_DIR/templates/index.html"