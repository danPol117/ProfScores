import { searchSchool, searchProfessorsAtSchoolId, getProfessorRatingAtSchoolId } from 'ratemyprofessor-api';

// Exported function to be used in the HTML file
export async function findProfessor(schoolName: string, professorName: string): Promise<string> {
  let htmlResult = '<ul>';

  try {
    // Search for the school
    const school = await searchSchool(schoolName);
    if (!school || school.length === 0) {
      htmlResult += `<li>School '${schoolName}' not found.</li>`;
      htmlResult += '</ul>';
      return htmlResult;
    }

    const schoolId = school[0].node.id;

    // Search for the professor within the found school
    const professorSearchResults = await searchProfessorsAtSchoolId(professorName, schoolId);
    if (!professorSearchResults || professorSearchResults.length === 0) {
      htmlResult += `<li>Professor '${professorName}' not found at '${schoolName}'.</li>`;
      htmlResult += '</ul>';
      return htmlResult;
    }

    const professorRating = await getProfessorRatingAtSchoolId(professorName, schoolId);
    if (!professorRating) {
      htmlResult += `<li>Ratings for '${professorName}' not found.</li>`;
      htmlResult += '</ul>';
      return htmlResult;
    }

    // Add professor details to the HTML list
    htmlResult += `<li>Professor Name: ${professorRating.formattedName}</li>`;
    htmlResult += `<li>School: ${school[0].node.name}</li>`;
    htmlResult += `<li>Overall Rating: ${professorRating.avgRating} / 5.0</li>`;
    htmlResult += `<li>Number of Ratings: ${professorRating.numRatings}</li>`;
    htmlResult += `<li>Would Take Again: ${professorRating.wouldTakeAgainPercent}%</li>`;
    htmlResult += `<li>Difficulty: ${professorRating.avgDifficulty} / 5.0</li>`;
    htmlResult += `<li>Department: ${professorRating.department}</li>`;
    htmlResult += `<li>Link: <a href="${professorRating.link}" target="_blank">${professorRating.link}</a></li>`;

  } catch (error) {
    htmlResult += `<li>Error: ${error}</li>`;
  }

  htmlResult += '</ul>';
  return htmlResult;
}
