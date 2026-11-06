const http = require('http');
const fs = require('fs');
const path = require('path');

const port = Number(process.env.PORT || 3000);
const root = __dirname;
const dataFile = path.join(root, 'data', 'tickets.json');
const servicesFile = path.join(root, 'data', 'services.json');

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

// Helper to read JSON data safely
function readJson(file, fallback = []) {
  try {
    if (!fs.existsSync(file)) return fallback;
    const content = fs.readFileSync(file, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    console.error(`Error reading ${file}:`, err.message);
    return fallback;
  }
}

// Helper to write JSON data safely
function writeJson(file, data) {
  try {
    const dir = path.dirname(file);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing ${file}:`, err.message);
    return false;
  }
}

// Helper to parse JSON body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 2e6) { // 2MB limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('Invalid JSON format'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

// Generate unique ticket code like AD-7429
function generateTicketId(existingTickets) {
  const existingIds = new Set(existingTickets.map(t => String(t.id).toUpperCase()));
  let newId = '';
  do {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    newId = `AD-${randomNum}`;
  } while (existingIds.has(newId));
  return newId;
}

const server = http.createServer(async (req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);

  // --- API ROUTES ---

  // 1. GET /api/tickets (list all or search)
  if (req.method === 'GET' && pathname === '/api/tickets') {
    const tickets = readJson(dataFile, []);
    const q = (parsedUrl.searchParams.get('q') || '').trim().toLowerCase();
    const status = parsedUrl.searchParams.get('status');

    let filtered = tickets;
    if (status && status !== 'all') {
      filtered = filtered.filter(t => t.status === status);
    }
    if (q) {
      filtered = filtered.filter(t =>
        (t.id && t.id.toLowerCase().includes(q)) ||
        (t.customerName && t.customerName.toLowerCase().includes(q)) ||
        (t.phone && t.phone.includes(q)) ||
        (t.deviceModel && t.deviceModel.toLowerCase().includes(q))
      );
    }
    return sendJson(res, 200, { success: true, count: filtered.length, tickets: filtered });
  }

  // 2. GET /api/tickets/:id (single ticket)
  const ticketIdMatch = pathname.match(/^\/api\/tickets\/([A-Za-z0-9\-]+)$/);
  if (req.method === 'GET' && ticketIdMatch) {
    const searchId = ticketIdMatch[1].toUpperCase();
    const tickets = readJson(dataFile, []);
    const found = tickets.find(t => String(t.id).toUpperCase() === searchId || (t.phone && t.phone.endsWith(searchId)));
    if (!found) {
      return sendJson(res, 404, { success: false, message: 'لم يتم العثور على تذكرة صيانة بهذا الرقم' });
    }
    return sendJson(res, 200, { success: true, ticket: found });
  }

  // 3. POST /api/tickets (Create ticket / Online booking)
  if (req.method === 'POST' && pathname === '/api/tickets') {
    try {
      const body = await parseBody(req);
      const tickets = readJson(dataFile, []);
      
      const newId = body.id || generateTicketId(tickets);
      const now = new Date();
      const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);

      const statusMap = {
        'waiting_approval': 'بانتظار موافقة العميل على التكلفة',
        'diagnosing': 'قيد الفحص والتشخيص الفني',
        'repairing': 'قيد الصيانة واستبدال القطع',
        'quality_check': 'اختبار الجودة والضمان بعد الإصلاح',
        'ready': 'جاهز للاستلام والتسليم',
        'delivered': 'تم التسليم للعميل بنجاح'
      };

      const newTicket = {
        id: newId,
        customerName: body.customerName || 'عميل غير مسجل',
        phone: body.phone || '',
        deviceBrand: body.deviceBrand || 'غير محدد',
        deviceModel: body.deviceModel || 'هاتف ذكي',
        color: body.color || 'افتراضي',
        issueCategory: body.issueCategory || 'general',
        issueDescription: body.issueDescription || 'طلب صيانة وارد عبر التطبيق',
        status: body.status || 'diagnosing',
        statusText: statusMap[body.status || 'diagnosing'] || 'قيد الفحص والتشخيص الفني',
        receivedAt: body.receivedAt || dateStr,
        estimatedCompletion: body.estimatedCompletion || 'خلال 24-48 ساعة',
        completedAt: body.completedAt || null,
        cost: Number(body.cost || 0),
        currency: body.currency || 'دولار',
        costYer: Number(body.costYer || (Number(body.cost || 0) * 530)),
        technician: body.technician || 'م. أديب الدُميني',
        replacedParts: body.replacedParts || 'قيد التحديد بعد الفحص المجهري',
        warrantyDays: Number(body.warrantyDays || 60),
        technicianNotes: body.technicianNotes || 'تم استلام الجهاز وجاري بدء خطوات الفحص الفني المعتمد.',
        passcode: body.passcode || 'غير محدد',
        intakeMethod: body.intakeMethod || 'حجز عبر تطبيق الويب',
        createdAt: now.toISOString()
      };

      tickets.unshift(newTicket);
      writeJson(dataFile, tickets);

      return sendJson(res, 201, { success: true, message: 'تم إنشاء تذكرة الصيانة بنجاح', ticket: newTicket });
    } catch (err) {
      return sendJson(res, 400, { success: false, message: err.message });
    }
  }

  // 4. PATCH /api/tickets/:id (Update ticket status / info)
  if (req.method === 'PATCH' && ticketIdMatch) {
    try {
      const targetId = ticketIdMatch[1].toUpperCase();
      const body = await parseBody(req);
      const tickets = readJson(dataFile, []);
      const index = tickets.findIndex(t => String(t.id).toUpperCase() === targetId);

      if (index === -1) {
        return sendJson(res, 404, { success: false, message: 'التذكرة غير موجودة' });
      }

      const statusMap = {
        'waiting_approval': 'بانتظار موافقة العميل على التكلفة',
        'diagnosing': 'قيد الفحص والتشخيص الفني',
        'repairing': 'قيد الصيانة واستبدال القطع',
        'quality_check': 'اختبار الجودة والضمان بعد الإصلاح',
        'ready': 'جاهز للاستلام والتسليم',
        'delivered': 'تم التسليم للعميل بنجاح'
      };

      const updated = {
        ...tickets[index],
        ...body,
        id: tickets[index].id, // Prevent altering ID
        statusText: body.status ? (statusMap[body.status] || body.statusText || tickets[index].statusText) : tickets[index].statusText
      };

      if (body.status === 'delivered' && !updated.completedAt) {
        updated.completedAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
      }

      tickets[index] = updated;
      writeJson(dataFile, tickets);

      return sendJson(res, 200, { success: true, message: 'تم تحديث التذكرة بنجاح', ticket: updated });
    } catch (err) {
      return sendJson(res, 400, { success: false, message: err.message });
    }
  }

  // 5. DELETE /api/tickets/:id
  if (req.method === 'DELETE' && ticketIdMatch) {
    const targetId = ticketIdMatch[1].toUpperCase();
    const tickets = readJson(dataFile, []);
    const filtered = tickets.filter(t => String(t.id).toUpperCase() !== targetId);
    if (filtered.length === tickets.length) {
      return sendJson(res, 404, { success: false, message: 'التذكرة غير موجودة' });
    }
    writeJson(dataFile, filtered);
    return sendJson(res, 200, { success: true, message: 'تم حذف التذكرة بنجاح' });
  }

  // 6. GET /api/services
  if (req.method === 'GET' && pathname === '/api/services') {
    const services = readJson(servicesFile, []);
    return sendJson(res, 200, { success: true, services });
  }

  // 7. GET /api/stats
  if (req.method === 'GET' && pathname === '/api/stats') {
    const tickets = readJson(dataFile, []);
    const stats = {
      total: tickets.length,
      diagnosing: tickets.filter(t => t.status === 'diagnosing').length,
      repairing: tickets.filter(t => t.status === 'repairing').length,
      qualityCheck: tickets.filter(t => t.status === 'quality_check').length,
      ready: tickets.filter(t => t.status === 'ready').length,
      delivered: tickets.filter(t => t.status === 'delivered').length,
      waitingApproval: tickets.filter(t => t.status === 'waiting_approval').length,
      totalRevenueUsd: tickets.reduce((sum, t) => sum + (Number(t.cost) || 0), 0),
      totalRevenueYer: tickets.reduce((sum, t) => sum + (Number(t.costYer) || 0), 0),
      avgWarrantyDays: Math.round(tickets.reduce((sum, t) => sum + (Number(t.warrantyDays) || 0), 0) / (tickets.length || 1)),
      successRate: 99.2
    };
    return sendJson(res, 200, { success: true, stats });
  }

  // --- STATIC FILE SERVING ---
  let rel = pathname === '/' ? '/index.html' : pathname;
  if (pathname === '/manus-routes.json') rel = '/public/manus-routes.json';
  if (pathname === '/manifest.json') rel = '/public/manifest.json';

  let filePath = path.join(root, rel);

  // Security check: prevent directory traversal
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    return res.end('Access denied');
  }

  // Check if file exists, else fallback to index.html for SPA routes
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(root, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    return res.end('Not found');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = types[ext] || 'application/octet-stream';

  res.writeHead(200, {
    'Content-Type': contentType,
    'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600'
  });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`📱 تطبيق أديب الدُميني — Phone Care يعمل بنجاح!`);
  console.log(`🌐 الرابط المحلي: http://localhost:${port}`);
  console.log(`🔧 نظام إدارة الصيانة وحاسبة الأعطال والتتبع جاهز.`);
  console.log(`=======================================================`);
});
