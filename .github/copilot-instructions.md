# Sheetsee.js Copilot Instructions

## Project Overview

Sheetsee.js is a client-side JavaScript library for connecting Google Spreadsheets to websites and visualizing data with tables and maps. It integrates with Tabletop.js for data fetching, Mustache.js for templating, and Leaflet.js for mapping.

This repository contains the documentation site and a pre-compiled full version of sheetsee.js. Core functionality lives in separate repositories (sheetsee-core, sheetsee-tables, sheetsee-maps).

## Architecture

- **Data Flow**: Tabletop.js fetches Google Sheets → Sheetsee processes data → Renders via Mustache templates
- **Components**: Core data utilities + optional tables (sortable/pagination/search) + maps (Leaflet-based)
- **Build System**: Custom CLI tool (`sheetsee`) for building minimal versions including only needed components
- **Module Format**: Pre-compiled library uses UMD (Universal Module Definition) for browser compatibility

## Key Patterns

- **Initialization**: Use `Tabletop.init({key: URL, callback: yourFunction, simpleSheet: true})` in DOMContentLoaded
- **Templates**: Place Mustache templates in `<script id="divId_template" type="text/html">` tags
- **Options Objects**: Pass configuration as objects (e.g., `Sheetsee.makeTable(options)`, `Sheetsee.loadMap(options)`)
- **Table Options**: Include `data`, `pagination`, `tableDiv`, `filterDiv` for full functionality
- **Map Options**: Include `data`, `mapDiv`, `geoJSONincludes`, `template` for popups
- **Data Structure**: Spreadsheet data arrives as array of objects, accessed via `rows` in templates

## Development Workflows

- **Build Docs**: `npm run build` - Converts `/docs/*.md` to HTML using marked + mustache templating with Handlebars layout
- **Clear Site**: `npm run clear` - Cleans generated HTML files (preserves hand-crafted demos)
- **Custom Builds**: Use global `sheetsee` CLI: `sheetsee -t --save` (tables only), `sheetsee -m --save` (maps only)
- **External Dependencies**: Always include Tabletop.js CDN, Leaflet CSS/JS for maps, sheetsee.js, and sss.css

## File Structure

- `/docs/` - Markdown documentation (edit these, not generated HTML)
- `/demos/` - Working examples showing integration patterns (see `demo-table.html`, `demo-map.html`, `demo-music.html`)
- `/js/sheetsee.js` - Pre-compiled full library (UMD module, ~15KB minified)
- `/scripts/buildpage.js` - Doc generation script using glob/marked/mustache
- `/scripts/template.hbs` - Handlebars template for HTML page layout

## Conventions

- Issues/PRs for JS code go to component repos (sheetsee-core, sheetsee-tables, sheetsee-maps)
- This repo is for documentation and site issues only
- Templates use `{{variable}}` syntax, data passed as `rows` array for tables
- Map data expects lat/lng columns for point mapping
- Demo pages include full working examples with CDN dependencies and inline scripts

## Examples

- Table: `Sheetsee.makeTable({data: data, pagination: 10, tableDiv: "#table", filterDiv: "#filter"})`
- Map: `Sheetsee.loadMap({data: data, mapDiv: "map", geoJSONincludes: ["name"], template: popupHTML})`
- Template: `<script id="table_template" type="text/html"><table>{{#rows}}<tr><td>{{column}}</td></tr>{{/rows}}</table></script>`
