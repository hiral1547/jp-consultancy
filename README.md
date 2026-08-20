# JP Construction & Consultancy

A responsive, lead-focused portfolio website for residential construction, renovation, 2D/3D design and consultancy.

## Included
- Project showcase using the supplied renders
- Services and simple 3-step process
- Direct call and WhatsApp CTAs
- Enquiry form that opens a pre-filled WhatsApp message
- Responsive mobile navigation
- Original neutral/olive visual theme retained

## Run
Open `index.html` directly or serve the folder with any static web server.

## Contact configuration
The WhatsApp number is currently set to **+91 63551 35078**, taken from the supplied pamphlet. If the number changes, update `whatsappNumber` in `script.js` and the `tel:` / `wa.me` links in `index.html`.

## Adding multiple projects
The Projects section is data-driven. Open `script.js` and find `const projects = [...]`.
Each object represents one project and can contain its own title, location, type, year, description and any number of images.

Example:
```js
{
  title: 'Villa Project',
  location: 'Vadodara, Gujarat',
  type: 'New Construction',
  year: '2026',
  summary: 'Turnkey residential construction.',
  images: [
    'assets/villa-01.jpg',
    'assets/villa-02.jpg',
    'assets/villa-03.jpg'
  ]
}
```
Add the image files to `assets/`, then add another object to the `projects` array. The website automatically creates a separate project card and gallery for it.
