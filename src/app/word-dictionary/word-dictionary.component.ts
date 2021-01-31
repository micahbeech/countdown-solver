import { Component, OnInit, SimpleChanges } from '@angular/core';
import DictionaryJson from '../../assets/dictionary_alpha.json'

@Component({
  selector: 'app-word-dictionary',
  templateUrl: './word-dictionary.component.html',
  styleUrls: ['./word-dictionary.component.css']
})
export class WordDictionaryComponent implements OnInit {

  letters = "";
  categories = [];
  solution: String[];

  constructor() {}

  ngOnInit(): void {
    this.categories = Object.values(DictionaryJson);
  }

  onClickSolve() {
    this.solve();
  }

  solve() {
    var permutations = this.getPermutations();
    console.log(permutations);

    var filteredWords: String[] = [];

    permutations.forEach((str) => {
      var words = this.categories[str.charCodeAt(0) - "a".charCodeAt(0)]
      if (str.toString() in words) {
        filteredWords.push(str);
      }
    });
    console.log(filteredWords);

    filteredWords.sort((a, b) => b.length - a.length);
    console.log(filteredWords);

    this.solution = filteredWords.slice(0, 1000);
    console.log(this.solution);
  }

  getPermutations(): String[] {
    var combinations = this.combine(this.letters, "", 0);
    var permutations: String[] = [];
    for (var i = 0; i < combinations.length; i++) {
      permutations = permutations.concat(this.permute(combinations[i]));
    }
    return permutations;
  }

  combine(instr: String, outstr: String, index: number): String[] {
    var combinations: String[] = [];
    for (var i = index; i < instr.length; i++) {
        outstr += instr.charAt(i);
        combinations.push(outstr);
        combinations = combinations.concat(this.combine(instr, outstr, i+1));
        outstr = outstr.slice(0,-1);
    }
    return combinations
  }

  permute(string: String): String[] {
    if (string.length < 2) return [string]; // This is our break condition
  
    var permutations = []; // This array will hold our permutations
    for (var i = 0; i < string.length; i++) {
      var char = string[i];
  
      // Cause we don't want any duplicates:
      if (string.indexOf(char) != i) // if char was used already
        continue; // skip it this time
  
      var remainingString = string.slice(0, i) + string.slice(i + 1, string.length); //Note: you can concat Strings via '+' in JS
  
      for (var subPermutation of this.permute(remainingString))
        permutations.push(char + subPermutation)
    }
    return permutations;
  }

}
