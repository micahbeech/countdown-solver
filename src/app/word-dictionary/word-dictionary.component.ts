import { Component, OnInit } from '@angular/core';
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

  /**
   * Sets solution to all valid english words that can be obtained from letters.
   */
  solve() {
    var permutations = this.getPermutations();

    var filteredWords: String[] = [];

    permutations.forEach((str) => {
      var words = this.categories[str.charCodeAt(0) - "a".charCodeAt(0)]
      if (str.toString() in words) {
        filteredWords.push(str);
      }
    });

    filteredWords.sort((a, b) => b.length - a.length);

    this.solution = filteredWords.slice(0, 1000);
  }

  /**
   * Computes all permutations of all lengths of the current letters.
   * 
   * @return {String[]} All permutations of all lengths of the current letters (except the empty string).
   */
  getPermutations(): String[] {
    var combinations = this.combine(this.letters, "", 0);
    var permutations: String[] = [];
    for (var i = 0; i < combinations.length; i++) {
      permutations = permutations.concat(this.permute(combinations[i]));
    }
    return permutations;
  }

  /**
   * Compute all combinations of a string.
   * 
   * @param {String} string1 The string to compute combinations of.
   * @param {String} string2 The current combination.
   * @param {number} index The location to begin within string1.
   * @return {String[]} All combinations of the string. Note: this does not remove duplicates.
   */
  combine(string1: String, string2: String, index: number): String[] {
    var combinations: String[] = [];

    for (var i = index; i < string1.length; i++) {

        string2 += string1.charAt(i);
        combinations.push(string2);
        combinations = combinations.concat(this.combine(string1, string2, i+1));
        string2 = string2.slice(0,-1);

    }

    return combinations;
  }

  /**
   * Compute all permutations of a string.
   * 
   * @param {String} string The string to compute permutations of.
   * @return {String[]} All permutations of the string. This does not compute sub-permutations.
   */
  permute(string: String): String[] {
    if (string.length < 2) return [string];
  
    var permutations: String[] = [];

    for (var i = 0; i < string.length; i++) {
      var char = string[i];
  
      if (string.indexOf(char) != i) continue;
  
      var remainingString = string.slice(0, i) + string.slice(i + 1, string.length);
  
      for (var subPermutation of this.permute(remainingString)) {
        permutations.push(char + subPermutation);
      }

    }

    return permutations;
  }

}
