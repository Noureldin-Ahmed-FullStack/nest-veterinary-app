import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Veterinary App API</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f4c75 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          .container {
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(10px);
            padding: 80px 60px;
            border-radius: 20px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
            text-align: center;
            max-width: 700px;
            margin: auto;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          h1 {
            background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-size: 3em;
            font-weight: 700;
            margin-bottom: 15px;
            letter-spacing: -1px;
          }
          .subtitle {
            color: #94a3b8;
            font-size: 1.1em;
            margin-bottom: 15px;
            font-weight: 500;
          }
          .description {
            color: #cbd5e1;
            line-height: 1.8;
            margin-bottom: 50px;
            font-size: 1em;
            opacity: 0.9;
          }
          .tech-stack {
            background: linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%);
            border: 1px solid rgba(96, 165, 250, 0.2);
            border-radius: 16px;
            padding: 40px;
            margin: 30px 0;
            text-align: left;
          }
          .tech-stack h3 {
            color: #60a5fa;
            margin-bottom: 25px;
            font-size: 1.5em;
            text-align: center;
          }
          .tech-item {
            margin-bottom: 20px;
            padding: 15px;
            background: rgb(129 157 201 / 28%);
            border-radius: 12px;
            border-left: 4px solid #3b82f6;
            transition: all 0.3s ease;
            cursor: pointer;
          }
          .tech-item:hover {
            background: rgba(30, 41, 59, 0.8);
            border-left-color: #60a5fa;
            transform: translateX(4px);
          }
          .tech-label {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color: white;
            padding: 4px 12px;
            border-radius: 6px;
            margin-right: 10px;
            font-size: 0.8em;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .tech-name {
            color: #f1f5f9;
            font-weight: 600;
            font-size: 1.1em;
          }
          .tech-description {
            color: #cbd5e1;
            font-size: 0.95em;
            margin-top: 5px;
            line-height: 1.6;
          }
          footer {
            margin-top: 50px;
            padding-top: 25px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            color: #64748b;
            font-size: 0.9em;
            font-weight: 500;
          }
          @media (max-width: 640px) {
            .container {
              padding: 50px 30px;
            }
            h1 {
              font-size: 2em;
            }
            .tech-stack {
              padding: 25px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🐾 Veterinary App API</h1>
          <p class="subtitle">Welcome to Your Pet Healthcare Solution</p>
          
          <p class="description">
            This API provides comprehensive veterinary management services including user authentication, 
            pet profiles, medical records, and appointment scheduling.
          </p>
          
          <div class="tech-stack">
            <h3>Technology Stack</h3>
            <div class="tech-item">
              <span class="tech-label">Framework</span>
              <div>
                <div class="tech-name">NestJS</div>
                <div class="tech-description">A progressive Node.js framework for building efficient and scalable server-side applications with TypeScript</div>
              </div>
            </div>
            <div class="tech-item">
              <span class="tech-label">Database</span>
              <div>
                <div class="tech-name">PostgreSQL</div>
                <div class="tech-description">A powerful, open-source relational database system known for its reliability, robustness, and advanced features</div>
              </div>
            </div>
            <div class="tech-item">
              <span class="tech-label">ORM</span>
              <div>
                <div class="tech-name">Prisma</div>
                <div class="tech-description">A next-generation ORM that provides a clean and type-safe database access layer with an intuitive data model</div>
              </div>
            </div>
          </div>
          
          <footer>
            <p>Veterinary App API v1.0 | Built with NestJS</p>
          </footer>
        </div>
      </body>
      </html>
    `;
  }
}
