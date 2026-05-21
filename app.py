import os
from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='dist/elearning-frontend-spa/browser')

# Serve static files and fallback to index.html for Angular SPA routing
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    # If the path points to an actual file in the static folder, serve it
    full_path = os.path.join(app.static_folder, path)
    if path != "" and os.path.exists(full_path) and os.path.isfile(full_path):
        return send_from_directory(app.static_folder, path)
    else:
        # Fallback to index.html for Angular's client-side routing
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    # Bind to the PORT environment variable supplied by Render
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)
