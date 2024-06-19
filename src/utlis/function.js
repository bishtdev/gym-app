import { EXERCISES, SCHEMES, WORKOUTS, TEMPOS } from "./swoldiers";

const exercises = exercisesFlattener(EXERCISES);

export function generateWorkout(args) {
  const { muscles, poison: workout, goals } = args;
  let exer = Object.keys(exercises);
  
  // Filter out exercises not suitable for 'home' environment
  exer = exer.filter((key) => exercises[key].meta.environment !== "home");
  
  let includedTracker = [];
  let listOfMuscles;

  if (workout === "individual") {
    listOfMuscles = muscles;
  } else {
    listOfMuscles = WORKOUTS[workout][muscles[0]] || [];
  }

  // Shuffle and convert to Set to remove duplicates
  listOfMuscles = new Set(shuffleArray(listOfMuscles));
  let arrOfMuscles = Array.from(listOfMuscles);
  let scheme = goals;
  let sets = SCHEMES[scheme].ratio.reduce((acc, curr, index) => {
    return [
      ...acc,
      ...Array(parseInt(curr)).fill(index === 0 ? "compound" : "accessory"),
    ];
  }, []).reduce((acc, curr, index) => {
    const muscleGroupToUse =
      index < arrOfMuscles.length
        ? arrOfMuscles[index]
        : arrOfMuscles[index % arrOfMuscles.length];
    return [
      ...acc,
      {
        setType: curr,
        muscleGroup: muscleGroupToUse,
      },
    ];
  }, []);

  const categorizedExercises = exer.reduce(
    (acc, curr) => {
      let exerciseHasRequiredMuscle = exercises[curr].muscles.some(musc => listOfMuscles.has(musc));
      if (exerciseHasRequiredMuscle) {
        acc[exercises[curr].type] = {
          ...acc[exercises[curr].type],
          [curr]: exercises[curr],
        };
      }
      return acc;
    },
    { compound: {}, accessory: {} }
  );

  const genWOD = sets.map(({ setType, muscleGroup }) => {
    const data = setType === "compound" ? categorizedExercises.compound : categorizedExercises.accessory;
    const filteredData = Object.keys(data).filter(curr =>
      !includedTracker.includes(curr) && data[curr].muscles.includes(muscleGroup)
    );

    const alternativeList = Object.keys(
      setType === "compound" ? categorizedExercises.accessory : categorizedExercises.compound
    ).filter(val => !includedTracker.includes(val));

    let randomExercise = filteredData.length
      ? filteredData[Math.floor(Math.random() * filteredData.length)]
      : alternativeList[Math.floor(Math.random() * alternativeList.length)];

    if (!randomExercise) return {};

    let repsOrDuration = exercises[randomExercise].unit === "reps"
      ? Math.min(...SCHEMES[scheme].repRanges) +
        Math.floor(Math.random() * (Math.max(...SCHEMES[scheme].repRanges) - Math.min(...SCHEMES[scheme].repRanges))) +
        (setType === "accessory" ? 4 : 0)
      : Math.floor(Math.random() * 40) + 20;

    const tempo = TEMPOS[Math.floor(Math.random() * TEMPOS.length)];

    if (exercises[randomExercise].unit === "reps") {
      const tempoSum = tempo.split(" ").reduce((acc, curr) => acc + parseInt(curr), 0);
      if (tempoSum * repsOrDuration > 85) {
        repsOrDuration = Math.floor(85 / tempoSum);
      }
    } else {
      repsOrDuration = Math.ceil(repsOrDuration / 5) * 5;
    }
    
    includedTracker.push(randomExercise);

    return {
      name: randomExercise,
      tempo,
      rest: SCHEMES[scheme]["rest"][setType === "compound" ? 0 : 1],
      reps: repsOrDuration,
      ...exercises[randomExercise],
    };
  });

  return genWOD.filter((element) => Object.keys(element).length > 0);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function exercisesFlattener(exercisesObj) {
  const flattenedObj = {};

  for (const [key, val] of Object.entries(exercisesObj)) {
    if (!val.variants) {
      flattenedObj[key] = val;
    } else {
      for (const variant in val.variants) {
        let variantName = `${variant}_${key}`;
        let variantSubstitutes = Object.keys(val.variants)
          .map((element) => `${element} ${key}`)
          .filter((element) => element.replaceAll(" ", "_") !== variantName);

        flattenedObj[variantName] = {
          ...val,
          description: `${val.description}___${val.variants[variant]}`,
          substitutes: [...val.substitutes, ...variantSubstitutes].slice(0, 5),
        };
      }
    }
  }
  return flattenedObj;
}
