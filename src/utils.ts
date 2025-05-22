export function shuffleArray<T>(array: T[]) : void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function createHybridArray(array1: string[], array2: string[]) : string[] {
    const array : string[] = [];
    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array2.length; j++) {
            array.push(array1[i] + array2[j])
        }
    }

    return array
}

export function determineValue(rank: string) : number | number[] {
    const simpleRanks : string[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10"]
    const complexRanks : string[] = ["J", "Q", "K"]

    if (simpleRanks.includes(rank)) {
        return Number(rank);
    } else if (complexRanks.includes(rank)) {
        return 10
    } else { 
        return [1, 11];
    }
}
