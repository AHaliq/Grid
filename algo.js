function algo(grid) {
  // calc type amount per row if not computed
  // if any type 5 fill remaining
  // for each row apply
    // rule 1 ..
    // rule 2 ._.
  // transpose and repeat
  // transpose back
  // if no change means stuck
  console.log("slv");
  let gridn = oneStep(grid);
  while(!eqGrid(gridn, grid)) {
    grid = gridn;
    gridn = oneStep(grid);
  }
  return gridn;
}

const oneStep = grid => transpose(applyRule(transpose(applyRule(grid))));

const transpose = matrix =>
  matrix[0].map((_, columnIndex) => 
    matrix.map(row => row[columnIndex]));

const applyRule = grid => 
  grid.map(xs => {
    xs = xs.reduce(rule0, xs);
    const mx = xs.length / 2;
    if(xs.filter(x => x === 1).length === mx)
      return xs.map(x => x === 0 ? 2 : x);
    if(xs.filter(x => x === 2).length === mx)
      return xs.map(x => x === 0 ? 1 : x);
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
