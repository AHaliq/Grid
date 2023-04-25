
const compareFull = grid => {
  while (compareOnce(grid)) {}
  return grid;
}

const compareOnce = grid => {
  for(let i = 0; i < grid.length - 1; i++) {
    for(let j = i + 1; j < grid.length; j++) {
      if(!almostEqArr(grid[i], grid[j]))
        continue;
      const [s1, s2] = [i,j].map(z => grid[z].filter(x => x === 0).length);
      if(s1 + s2 !== 2)
        continue;
      const [t,s] = s1 === 2 ? [i,j]: [j,i];
      const es = grid[t].reduce((xs,x,i) => x === 0 ? [...xs, i] : xs, []);
      grid[t][es[0]] = grid[s][es[1]];
      grid[t][es[1]] = grid[s][es[0]];
      return true;
    }
  }
  return false;
}

const algo = grid => {
  let gridn = oneStep(grid);
  while(!eqGrid(gridn, grid)) {
    grid = gridn;
    gridn = oneStep(grid);
  }
  return gridn;
}
const oneStep = grid => transpose(compareFull(applyRule(transpose(compareFull(applyRule(grid))))));

const transpose = matrix =>
  matrix[0].map((_, columnIndex) => 
    matrix.map(row => row[columnIndex]));

const applyRule = grid => 
  grid.map(xs => {
    xs = xs.reduce(rule0, xs);
    // apply rules
    const mx = xs.length / 2;
    if(xs.filter(x => x === 1).length === mx)
      return xs.map(x => x === 0 ? 2 : x);
    if(xs.filter(x => x === 2).length === mx)
      return xs.map(x => x === 0 ? 1 : x);
    // count n/2
    return xs;
  });

const rule0 = (xs,x,i) => x === 0 ? xs : allRules(xs,x,i);

// _xx_ -> yxxy
const rule1 = (xs,x,i) => {
  if(x===0) return [xs,x,i];
  const y = 3 - x;
  if(i < xs.length - 1 && x == xs[i+1]) {
    if(i > 0) xs[i-1] = y;
    if(i < xs.length - 2) xs[i+2] = y;
  }
  return [xs,x,i];
};

// x_x -> xyx
const rule2 = (xs,x,i) => {
  if(x===0) return [xs,x,i];
  const y = 3 - x;
  if(i < xs.length - 2 && x == xs[i+2]) xs[i+1] = y;
  return [xs,x,i];
}

const allRules = (...arg) => [rule1,rule2].reduce((arg,f) => f(...arg), arg)[0];
