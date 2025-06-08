module.exports = {
    port: 3002,
    server: {
        baseDir: "./",
        middleware: function (req, res, next) {
            if (req.method === 'POST' && req.url === '/api/save') {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', () => {
                    try {
                        const fs = require('fs');
                        const csvPath = './js/data.csv';
                        const data = JSON.parse(body);
                        
                        // Read existing CSV
                        let csvContent = fs.readFileSync(csvPath, 'utf8');
                        // Split by newline, but handle potential carriage returns
                        let lines = csvContent.split(/\r?\n/);
                        let headers = lines[0].split(',').map(h => h.trim());
                        
                        // Find column indices
                        const titleIndex = headers.indexOf('title');
                        const textIndex = headers.indexOf('text');
                        const importantIndex = headers.indexOf('important');
                        
                        // Add important column if needed
                        if (importantIndex === -1) {
                            headers.push('important');
                            lines[0] = headers.join(',');
                            lines = lines.map((line, index) => {
                                if (index === 0) return line;
                                return line + ',false';
                            });
                        }
                        
                        // Process each line
                        let updated = false;
                        lines = lines.map((line, index) => {
                            if (index === 0) return line;
                            if (!line.trim()) return line; // Skip empty lines
                            
                            // Properly handle CSV parsing
                            let columns = line.split(',').map(col => col.trim());
                            
                            if (columns[titleIndex]?.trim() === data.id?.trim()) {
                                updated = true;
                                // Escape special characters in text
                                let escapedText = data.text
                                    .replace(/"/g, '""') // Double up quotes
                                    .replace(/\r?\n/g, ' '); // Replace newlines with spaces
                                
                                columns[textIndex] = `"${escapedText}"`;
                                columns[importantIndex] = data.important || 'false';
                                
                                return columns.join(',');
                            }
                            return line;
                        });
                        
                        // Filter out empty lines and join with proper line endings
                        const outputContent = lines
                            .filter(line => line.trim())
                            .join('\n');
                        
                        fs.writeFileSync(csvPath, outputContent);
                        
                        res.writeHead(200, { 
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        });
                        res.end(JSON.stringify({ 
                            success: true, 
                            updated: updated,
                            important: data.important 
                        }));
                    } catch (error) {
                        console.error('Error:', error);
                        res.writeHead(500, { 
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        });
                        res.end(JSON.stringify({ error: error.message }));
                    }
                });
                return;
            }
            next();
        }
    }
};