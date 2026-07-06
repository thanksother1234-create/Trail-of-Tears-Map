const routeData = {
  cherokee: { label:'CHEROKEE ROUTE', title:'Fort Payne, Alabama', year:'1838', color:'cherokee', x:705, y:220, text:'Cherokee families were held in stockades and makeshift prisons before beginning the long march west. Many died in these early stages from disease and poor conditions.' },
  choctaw: { label:'CHOCTAW ROUTE', title:'Mississippi Homeland', year:'1831–1833', color:'choctaw', x:425, y:366, text:'Choctaw removal began soon after the Treaty of Dancing Rabbit Creek. Families were forced west through harsh weather, hunger, and disease.' },
  chickasaw: { label:'CHICKASAW ROUTE', title:'Northern Mississippi', year:'1837', color:'chickasaw', x:414, y:287, text:'Chickasaw removal followed land cession agreements that pushed communities west toward Indian Territory and disrupted long-established homelands.' },
  creek: { label:'CREEK ROUTE', title:'Alabama and Georgia', year:'1836', color:'creek', x:575, y:355, text:'Creek removal followed conflict, land pressure, and federal enforcement. Thousands were marched west under military supervision.' },
  seminole: { label:'SEMINOLE ROUTE', title:'Florida Removal', year:'1830s–1842', color:'seminole', x:682, y:468, text:'Seminole resistance made removal longer and more violent. Many were forced west after years of war, while others remained in Florida.' }
};

const pointsLayer = document.getElementById('points');
const card = document.getElementById('infoCard');
const closeCard = document.getElementById('closeCard');
const tabs = document.querySelectorAll('#tabs button');
const routes = document.querySelectorAll('.route');

Object.entries(routeData).forEach(([key, item]) => {
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('class', 'map-point');
  g.setAttribute('data-route', key);
  g.innerHTML = `<circle cx="${item.x}" cy="${item.y}" r="12" fill="var(--${item.color})"></circle><text x="${item.x + 16}" y="${item.y - 12}">${item.title.split(',')[0]}</text>`;
  g.addEventListener('click', () => selectRoute(key));
  pointsLayer.appendChild(g);
});

routes.forEach(route => {
  route.addEventListener('click', () => selectRoute(route.dataset.route));
});

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    filterRoutes(tab.dataset.filter);
  });
});

closeCard.addEventListener('click', () => card.style.display = 'none');

function filterRoutes(filter) {
  routes.forEach(route => {
    const match = filter === 'all' || route.dataset.route === filter;
    route.classList.toggle('dimmed', !match);
    route.classList.remove('focused');
  });
  document.querySelectorAll('.map-point').forEach(point => {
    const match = filter === 'all' || point.dataset.route === filter;
    point.classList.toggle('hidden', !match);
  });
  if (filter !== 'all') selectRoute(filter);
}

function selectRoute(key) {
  const item = routeData[key];
  card.style.display = 'block';
  card.querySelector('.route-label').className = `route-label ${item.color}-text`;
  card.querySelector('.route-label').textContent = item.label;
  card.querySelector('h3').textContent = item.title;
  card.querySelector('span').textContent = item.year;
  card.querySelector('p:nth-of-type(2)').textContent = item.text;

  routes.forEach(route => {
    route.classList.toggle('focused', route.dataset.route === key);
  });
}
