/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 * Copyright 2023 Comcast
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { SdfTrFontFace } from '@lightningjs/renderer';

const basePath = import.meta.env.BASE_URL;

export function loadFonts(stage) {
  stage.fontManager.addFontFace(
    new SdfTrFontFace('msdf', {
      fontFamily: 'Poppins',
      descriptors: {
        weight: 400,
      },
      atlasDataUrl: basePath + 'fonts/Poppins-Regular.msdf.json',
      atlasUrl: basePath + 'fonts/Poppins-Regular.msdf.png',
      stage,
    }),
  );
  stage.fontManager.addFontFace(
    new SdfTrFontFace('msdf', {
      fontFamily: 'Poppins',
      descriptors: {
        weight: 500,
      },
      atlasDataUrl: basePath + 'fonts/Poppins-Medium.msdf.json',
      atlasUrl: basePath + 'fonts/Poppins-Medium.msdf.png',
      stage,
    }),
  );
  stage.fontManager.addFontFace(
    new SdfTrFontFace('msdf', {
      fontFamily: 'Poppins',
      descriptors: {
        weight: 600,
      },
      atlasDataUrl: basePath + 'fonts/Poppins-SemiBold.msdf.json',
      atlasUrl: basePath + 'fonts/Poppins-SemiBold.msdf.png',
      stage,
    }),
  );
  stage.fontManager.addFontFace(
    new SdfTrFontFace('msdf', {
      fontFamily: 'Poppins',
      descriptors: {
        weight: 700,
      },
      atlasDataUrl: basePath + 'fonts/Poppins-Bold.msdf.json',
      atlasUrl: basePath + 'fonts/Poppins-Bold.msdf.png',
      stage,
    }),
  );
}