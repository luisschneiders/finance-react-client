export function getSummary(id: number, year: number) {
  return fetch(`http://local.developing:3030/main-by-year/id=${id}&year=${year}`)
          .then(response => response.json())
          .then((result: any[]) => {
            console.log('LFS - 1 results: ', result);
          })
}