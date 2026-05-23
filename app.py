import os
import mimetypes
from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='dist/elearning-frontend-spa/browser')

# Ensure correct MIME types are registered regardless of host OS config
mimetypes.init()
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('application/javascript', '.mjs')
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('text/html', '.html')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    # Determine the absolute path of the requested resource
    full_path = os.path.join(app.static_folder, path)
    
    # 1. If path points to an actual file, serve it with proper caching headers
    if path != "" and os.path.exists(full_path) and os.path.isfile(full_path):
        response = send_from_directory(app.static_folder, path)
        
        # Enable long-term caching for hashed static assets
        if path.endswith(('.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.woff', '.woff2', '.ttf', '.eot', '.ico')):
            response.headers['Cache-Control'] = 'public, max-age=31536000, immutable'
        return response
        
    # 2. If it is a request for a missing static asset (has an extension), return a 404 instead of falling back to index.html
    _, ext = os.path.splitext(path)
    if ext:
        return f"Static asset '{path}' not found", 404

    # 3. Fallback to index.html for client-side routing, disabling caching so index.html is always fresh
    response = send_from_directory(app.static_folder, 'index.html')
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response

if __name__ == '__main__':
    # Bind to the PORT environment variable supplied by Render
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)

