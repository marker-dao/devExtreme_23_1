/**
* DevExtreme (cjs/__internal/core/license/sha1.test.js)
* Version: 25.2.0
* Build date: Thu Jul 31 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globals = require("@jest/globals");
var _byte_utils = require("./byte_utils");
var _sha = require("./sha1");
(0, _globals.describe)('sha1', () => {
  _globals.it.each([{
    message: 'Mc0uOoTYqOKxw8ySvS8wekxeK3Wvoohqmso1NECIxXtGmdhLXEh2aszCu4fFjVaeotS2XYlOymReowrmEDKV83AzWBxaWGSnGh/yWaj967IGdkMlUprptvczCGVNHJQinDaD6AmJlUT8/Xf3GWpVyfWa9Y1bCEj2tUwTzbcNHcS1/BvCU=',
    expected: 'b3f9594a44074857e754ecc95af9fe84727aa433'
  }, {
    message: '4obOX1DO1eCjoDKkkr/dcng/jIl/i3GgWkVWiLYktjVzoLm6Zd5hMU1TJLKSN85yjYOOnYlOymReowrmEDKV83AzWBxaWGSnGh/3LIIShYPWZBpahcXrTMhdResW7MSDjfL47i15OSXWJuxFWONVxJV6vUQLNpu3CorMNjnHBcmo2xv8XK=',
    expected: '8d2a4097a85d1a973bc0bf76b8102a19ed45ca08'
  }, {
    message: '4obOX1DO1eCjoDKkkr/dcng/jIl/i3GgWkVWiLYktjVzoLm6Zd5hMU1TJLKSN85yjYOOnYlOymReowrmEDKV83AzWBxaWGSnGh/3LIIShYPWZBpahcXrTMhdResW7MSDjfL47i15OSXWJuxFWONVxJV6vUQLNpu3CorMNjnHBcmo2xv8XK==',
    expected: '7e4bc9ac8455ca6b52ee824d6099a4a2e0d57e1d'
  }, {
    message: '4obOX1DO1eCjoDKkkr/dcng/jIl/i3GgWkVWiLYktjVzoLm6Zd5hMU1TJLKSN85yjYOOnYlOymReowrmEDKV83AzWBxaWGSnGh/3LIIShYPWZBpahcXrTMhdResW7MSDjfL47i15OSXWJuxFWONVxJV6vUQLNpu3CorMNjnHBcmo2xv8XK===',
    expected: '6d0aa1a2143c883e1306f2ba49320034317ad289'
  }, {
    message: 'psffJ8rON7jKl6tzNVQ025eVzLqpQrQmeUmrPcPeo1KeeTrB3nLWrSR5Pil8487hRnqPWYlOymReowrmEDKV83AzWBxaWGSnGh/bzBMVSJsqc5IEWvpaewh46gw81MnzI3uq7PgGg2Q+DfJEun2jK4j0SoanDGUy5qkHW4t6Ygd6K41t6Jcw==',
    expected: '265c99e18a147cc505e90ba310e52eb1289ee48a'
  }, {
    message: 'O9GVjWzI0sKkdY5vh0HCUnAvXmmsS6G2UoVsNUQxjl7dU11Qw4nZOE3AWU14YSWuZnIxqYlOymReowrmEDKV83AzWBxaWGSnGh/WFdu4EoeU2bLLhUpUQ7QDhNJIiKMrRTZLHLxWdfMlTVzZiFZHF7vdiU3j/iUiG8xj+Yl8U1lj+Z04G94WE==',
    expected: '942c1f3969b8d811160ded393da6d4fe30b5b756'
  }, {
    message: 'Iq9Ba2NgtsSFKIS23FljlCXMon95iYSwkUZ9fLXgk7WHhbDDOXpGq1xb2tHMQ0E9l7qFsYlOymReowrmEDKV83AzWBxaWGSnGh/UTGZLOFIZCSP77KNkGLSTBeQItvOeKMKuF+eCvgWb9uJ2LSfjNhzENQXtKZlHmkVpxUsaDThc9ru36GLdNZ==',
    expected: 'e2b83319935f5f91f34c05882b447a31b05d061d'
  }, {
    message: 'Iq9Ba2NgtsSFKIS23FljlCXMon95iYSwkUZ9fLXgk7WHhbDDOXpGq1xb2tHMQ0E9l7qFsYlOymReowrmEDKV83AzWBxaWGSnGh/UTGZLOFIZCSP77KNkGLSTBeQItvOeKMKuF+eCvgWb9uJ2LSfjNhzENQXtKZlHmkVpxUsaDThc9ru36GLdNZ===',
    expected: 'df660a1ae739d8837007c97138ccd981144ee356'
  }, {
    message: 'XGJyY2tfr3PHOE63RXN/hqdtqXnWbqqgNJ5aW3FVZ3JcqlhsVlelILvGz5WntJ2vt4A/VYlOymReowrmEDKV83AzWBxaWGSnGh/UOQT3XSzDq3OMAkU7a1SJCoNLXYLKpurEu2LWJYwci9ezJpWoctfnDEqSNexCqkRmyRuHhDTI9POjYun8gxcg==',
    expected: '84d765e1d718f4ae42f9446f812df79a9ee8f849'
  }, {
    message: 'kM+nn0evYmmKPzjAJDS2cczZk6IgutTD2U6tbKZ5VW5rVUaGu2tdNo09TOCOOblAK7gyxYlOymReowrmEDKV83AzWBxaWGSnGh/nS3M2JUYJZdXSM4RJ1S21Piwp83gCHjaCZ0VWGz4czfTYzRJnc5hT903VNwpjYoWzlg2jVgKLdyQzek1Hg1ZXg==',
    expected: '9c3792b40a2e2c18e48e323c5fc0bf2aa00a1129'
  }, {
    message: 'bKSYZ+HBmWpSkFAn2ZnPXEBeeGU7aNXJrYCtiM7XhojauGzDnbpv4We5Ysc9xkarKK7cNYlOymReowrmEDKV83AzWBxaWGSnGh/0W0kpKrhSciSXyIjnbZWGq6YJmcy3huhENZz1BSQEc+VIlSjdAnXjJff9nedYiOM0SUTsNw1qFjhGSIS8EiprfX==',
    expected: 'b2a86149bd62e9cbea20a6d03d93a5cf37ef9e45'
  }, {
    message: 'bKSYZ+HBmWpSkFAn2ZnPXEBeeGU7aNXJrYCtiM7XhojauGzDnbpv4We5Ysc9xkarKK7cNYlOymReowrmEDKV83AzWBxaWGSnGh/0W0kpKrhSciSXyIjnbZWGq6YJmcy3huhENZz1BSQEc+VIlSjdAnXjJff9nedYiOM0SUTsNw1qFjhGSIS8EiprfX===',
    expected: '4f702e06778058fa4d651380f55e0bb475fe96b0'
  }, {
    message: 'RS2lYz6JKJIi31g7v6I1rohUg0W1ujBzmqPhg81HY44id200t4Jmsc7imdlHaIkntd/DJYlOymReowrmEDKV83AzWBxaWGSnGh/7thX70/cpBIQqy62TEys7A0zi2ap727Y53c2XPep1qL0J6Eyp9IOI9OXlfhh89DhsI9gT1B41VHyI2a1akj3pe7VQ==',
    expected: 'c688c0939d3f8aa13f046573a2ef0481b35d6ce6'
  }, {
    message: '3r+9223C1rN8omedYozHV1uLd47ZkmCVby0sTdJUaYpWIcdehsBndZyjnn/XyoFBfts4ZYlOymReowrmEDKV83AzWBxaWGSnGh/7DBwcpwlaUzd8mpcXHKg7hS01nQPijaY6guRuBY4WaCwpOWNHk1cJy11ErITlqL1VLOPcpbnnqQumdP0KqYgXtyIcE==',
    expected: 'c1af45cd997aff615f779e3d767be01a578d79bc'
  }, {
    message: 'yMZsLqh6Q3UtVcA4YKWizN2SWaNgydNFXp3c2XVnT26IwEOZYYpwaWx5O6+zm8d1ht+D2YlOymReowrmEDKV83AzWBxaWGSnGh/YQwtLRmXd1WOsleMLWFI6GJ06o6Vq1ImEqBzzGPaVmxxSuBKcyCmILgTt93Yt3KQLZ7oYS7ddjGjG5Zcp62kX8jxEvQ==',
    expected: '06d393f0e374fb0533e18354434a51861ff6bc36'
  }, {
    message: 'yMZsLqh6Q3UtVcA4YKWizN2SWaNgydNFXp3c2XVnT26IwEOZYYpwaWx5O6+zm8d1ht+D2YlOymReowrmEDKV83AzWBxaWGSnGh/YQwtLRmXd1WOsleMLWFI6GJ06o6Vq1ImEqBzzGPaVmxxSuBKcyCmILgTt93Yt3KQLZ7oYS7ddjGjG5Zcp62kX8jxEvQ===',
    expected: 'd24926373650c76e5ff0df653e016a2ca43ff9e5'
  }, {
    message: 'skDcapZ+R4eeU0AwdtglxzvTi7DLJsosjDh5blKe0d9HeMLE1XraN75Xuo6eJ+N5fE5GwYlOymReowrmEDKV83AzWBxaWGSnGh/1bIKYGAVTDMkEHAx4hGUCh6fYG0UMRYl2XCf2S8q9MiWT+UVtKtRF1hsEWozts0Q3Wx3J8/eKtwR7HHlrNVcXRIvLKHOQ==',
    expected: '4a55f2b7196f087867d281be2bdcd9e6b6482541'
  }, {
    message: 'zuMwSl05KIWxoWVoLCG+yHyeiKE3YououyWO45C8X7eRPy4n00XZj3e/NCavy8O5S8dsdYlOymReowrmEDKV83AzWBxaWGSnGh/d2OerSDpnA6n2A2mM/WNEHaU2hSn4hBKWKE02uNvdmSnydWl2ZWvjN022g9rz5oaDA3bktsz1GksG5EYUp1Y6pMrdxBdZM==',
    expected: 'cc9a46a2600dbda355f409985c47dcaa1be4d950'
  }, {
    message: '1NNerFCzJdFwvkzVdnhcf5GpzMVPuNeSz7PJkqdhJWBbiy1TMnU/VLbOO1JSW2ijyIdYTYlOymReowrmEDKV83AzWBxaWGSnGh/NPdUJasW9JgzEXBYXPfOE2gspucI7Fap9vKu3tyP6Y0kHu1bIk9Ib2AjCidpclVwip3RTBNVTw+Mt7hnzLdIzldOjyiy8TD==',
    expected: 'fad6046006034417be787896582b1d7a93d8ff51'
  }, {
    message: '1NNerFCzJdFwvkzVdnhcf5GpzMVPuNeSz7PJkqdhJWBbiy1TMnU/VLbOO1JSW2ijyIdYTYlOymReowrmEDKV83AzWBxaWGSnGh/NPdUJasW9JgzEXBYXPfOE2gspucI7Fap9vKu3tyP6Y0kHu1bIk9Ib2AjCidpclVwip3RTBNVTw+Mt7hnzLdIzldOjyiy8TD===',
    expected: '83379a6faa0ba68917f87aa68d0e4435212e9fb0'
  }, {
    message: 'vZjMNyVUz6l2rpDisWbMQ2m+imN1ll1JbdiFNE3QU1BUaaCUMzm9e6DRcDo8x+DZnzFfpYlOymReowrmEDKV83AzWBxaWGSnGh/FOJqWNrgX3gf3yWjnvQcmXUh5GlcVxlLDPPSbB6c4CmnVx/TlWRl52IvG/IYON8j7xZpd1RyTNPca6vgY5UI+BKmMh/jSBcUQ==',
    expected: 'f6bcdc00a2eba7d1230784daad79e22890818b29'
  }, {
    message: '2UavnuLVzmzZcT2iSYUzMdpu2ZJBuXq3v5HVoqc9mdCoxUCLmGJ8uUWOjlKQV3pvaCs5IYlOymReowrmEDKV83AzWBxaWGSnGh/rSU35Zcd8whM91i1beak7FOMoGXWWXdRUuDIuA2TSEqdtXWRVfBQqaVcZyM4d25ldaPJ51fqo7Dy0PgNFc+VVXLtoohyb8qIGU==',
    expected: '21ac3300a3bd39eb0ac4dde975f356dc6cc2e88f'
  }, {
    message: 'qKSUTdpMPmtCuCSANjA+jo1Blc29ta13w58/Q2XfroB/aGwoNyyIg93G3r5BOC56OH2ddYlOymReowrmEDKV83AzWBxaWGSnGh/0c7P2KApotoa0DYWDW9QNePe0zdS2+OuFORVVGzleHWYJtWb47aPW29LeDLokRhdTd4s7vRhsnGaCVMzlZ92bK/iL1xItSnmC7N==',
    expected: '6326df8fc9e27290e722040a5a89c665c42e4970'
  }, {
    message: 'qKSUTdpMPmtCuCSANjA+jo1Blc29ta13w58/Q2XfroB/aGwoNyyIg93G3r5BOC56OH2ddYlOymReowrmEDKV83AzWBxaWGSnGh/0c7P2KApotoa0DYWDW9QNePe0zdS2+OuFORVVGzleHWYJtWb47aPW29LeDLokRhdTd4s7vRhsnGaCVMzlZ92bK/iL1xItSnmC7N===',
    expected: 'e7fcb34c6208a8bb3b83276256b02db84b4a2d58'
  }, {
    message: '3Yu5tJh7tkC23bLJ282OrYXFM1WRKHtIq1K5vHm0c386ka+Liy5mkHGRy5+FNkMso9jSOYlOymReowrmEDKV83AzWBxaWGSnGh/HdKjFJZXyPG0V+LUp6FX1jfPtjd3W1pK2g1X2C1NZXCii2rwbR73Vjj2siPX6C+cuLFyIEhgK1LNV5IuFPYJXdhnN7YKiOxVWJRew==',
    expected: 'bd1ae699155cd1ed9ccb0b83e85c5369ade5c100'
  }, {
    message: 'k1IkZGDgeyBwxn2mKmhUjCguiXM2lIJFuXfVxc+wxXpjKlRvRixKZtisW5hRNpBSQp7LKYlOymReowrmEDKV83AzWBxaWGSnGh/6XevmKeU4Myll04ll/ZkdGZJmFBhlni3kG1ldlMv81Jg3+HqV9qO5TMe8NHL96JNpLOelF11Mx22K4pRq6Xw823ImU6NaTgwoe+lSU==',
    expected: '3584632fa158631f560a3188e44fea7cf1335d64'
  }, {
    message: 'k1IkZGDgeyBwxn2mKmhUjCguiXM2lIJFuXfVxc+wxXpjKlRvRixKZtisW5hRNpBSQp7LKYlOymReowrmEDKV83AzWBxaWGSnGh/6XevmKeU4Myll04ll/ZkdGZJmFBhlni3kG1ldlMv81Jg3+HqV9qO5TMe8NHL96JNpLOelF11Mx22K4pRq6Xw823ImU6NaTgwoe+lSU===',
    expected: '504ac0cf414f6c9eaff8d9695ba3a16f9de13fb8'
  }, {
    message: 'Q5WLxjGnWWmPV7J3wry4nnh3TWtVJCI/wyA0PTkxOkizkFGUmriUtyZE3pDYS9PTlXKp4YlOymReowrmEDKV83AzWBxaWGSnGh/8BrYmrUKJ4s4rskzH6B0F1Fzc/JXsDAfoZENLRscEFNsODcq3tZ3y+XumGpIGuVKtauR0KhnFKgqD2BY4GposmOiWqlwnRYr0CMnbHd===',
    expected: '428c972a2cca610b29317465881768629da7465f'
  }, {
    message: 'iSWuWnS6PE8gMrWXmb57ONpil1+VTFBtJpqNpMe7blpRUMybeds6JjEohEZeSnR6JHuytVDKkWOBVVwrpIB8jnKWsiJIkUtrVanjaG++RGnJzaFdkjRlZ5WEsuJKd1GDJjfUtiOrYlZG29FshZfFqoPRzrPg12hIx5RxJp1ncKqpwKvCcceiYVvBbi9xaUQ7031Ts1SkwDF+oHdHz4ssri/HyqBZNM56br6ZLzedOEKdf6jMx9WQfi2DLEXfbTQybdNdd92tj6+mwl/Rnk1rcGid',
    expected: '9a0af8f0664788dfbc0c85ffdb86b1d9fd5465a2'
  }, {
    message: 'iSWuWnS6PE8gMrWXmb57ONpil1+VTFBtJpqNpMe7blpRUMybeds6JjEohEZeSnR6JHuytVDKkWOBVVwrpIB8jnKWsiJIkUtrVanjaG++RGnJzaFdkjRlZ5WEsuJKd1GDJjfUtiOrYlZG29FshZfFqoPRzrPg12hIx5RxJp1ncKqpwKvCcceiYVvBbi9xaUQ7031Ts1SkwDF+oHdHz4ssri/HyqBZNM56br6ZLzedOEKdf6jMx9WQfi2DLEXfbTQybdNdd92tj6+mwl/Rnk1rcGid=',
    expected: 'd6661f7156968ae68b4d5d135ba36e0f408f3a75'
  }, {
    message: 'iSWuWnS6PE8gMrWXmb57ONpil1+VTFBtJpqNpMe7blpRUMybeds6JjEohEZeSnR6JHuytVDKkWOBVVwrpIB8jnKWsiJIkUtrVanjaG++RGnJzaFdkjRlZ5WEsuJKd1GDJjfUtiOrYlZG29FshZfFqoPRzrPg12hIx5RxJp1ncKqpwKvCcceiYVvBbi9xaUQ7031Ts1SkwDF+oHdHz4ssri/HyqBZNM56br6ZLzedOEKdf6jMx9WQfi2DLEXfbTQybdNdd92tj6+mwl/Rnk1rcGid==',
    expected: 'adc4390406081f5ed20271e2a7539ab3a23326c8'
  }, {
    message: 'iSWuWnS6PE8gMrWXmb57ONpil1+VTFBtJpqNpMe7blpRUMybeds6JjEohEZeSnR6JHuytVDKkWOBVVwrpIB8jnKWsiJIkUtrVanjaG++RGnJzaFdkjRlZ5WEsuJKd1GDJjfUtiOrYlZG29FshZfFqoPRzrPg12hIx5RxJp1ncKqpwKvCcceiYVvBbi9xaUQ7031Ts1SkwDF+oHdHz4ssri/HyqBZNM56br6ZLzedOEKdf6jMx9WQfi2DLEXfbTQybdNdd92tj6+mwl/Rnk1rcGid===',
    expected: '9e298a1deb589d2decc79d4fdef0bacb97c731e5'
  }, {
    message: 'W2k63kutw3t2bbjNmkrNkbegMEXjV49IuNW20yFxg6OFQS3jyHqfM+GcIGeXSK20IC3dfSqg1Ttn0TksejBpM8d1JJ6MrFUrR4VqMkBqRKFziy3NqJ5zy4msPpNR23Fl0LJRVy+afdtkN1aGfGc2Upgr2LlC1MmdL2gj2Sd/cZAvxbJtOUSkvEGX1aBohpsqI6fBe93bdC5Qm8Tdzaynp0G5wKtydj/jr75z12fbtqMzbIjPPzihPz2LpLw12XtcKrl3j1uZL6amIr6xgIMkJ5krJw==',
    expected: '7a86854ad583d29d9461ea8a74ff04502279d3ec'
  }, {
    message: 'W2k63kutw3t2bbjNmkrNkbegMEXjV49IuNW20yFxg6OFQS3jyHqfM+GcIGeXSK20IC3dfSqg1Ttn0TksejBpM8d1JJ6MrFUrR4VqMkBqRKFziy3NqJ5zy4msPpNR23Fl0LJRVy+afdtkN1aGfGc2Upgr2LlC1MmdL2gj2Sd/cZAvxbJtOUSkvEGX1aBohpsqI6fBe93bdC5Qm8Tdzaynp0G5wKtydj/jr75z12fbtqMzbIjPPzihPz2LpLw12XtcKrl3j1uZL6amIr6xgIMkJ5krJw===',
    expected: 'b81c203728a2c9193fd614780f0bcfb560586019'
  }, {
    message: 'W2k63kutw3t2bbjNmkrNkbegMEXjV49IuNW20yFxg6OFQS3jyHqfM+GcIGeXSK20IC3dfSqg1Ttn0TksejBpM8d1JJ6MrFUrR4VqMkBqRKFziy3NqJ5zy4msPpNR23Fl0LJRVy+afdtkN1aGfGc2Upgr2LlC1MmdL2gj2Sd/cZAvxbJtOUSkvEGX1aBohpsqI6fBe93bdC5Qm8Tdzaynp0G5wKtydj/jr75z12fbtqMzbIjPPzihPz2LpLw12XtcKrl3j1uZL6amIr6xgIMkJ5krJw====',
    expected: '1111cbaddcfbc0105e7313501a555190db94abe7'
  }, {
    message: 'W2k63kutw3t2bbjNmkrNkbegMEXjV49IuNW20yFxg6OFQS3jyHqfM+GcIGeXSK20IC3dfSqg1Ttn0TksejBpM8d1JJ6MrFUrR4VqMkBqRKFziy3NqJ5zy4msPpNR23Fl0LJRVy+afdtkN1aGfGc2Upgr2LlC1MmdL2gj2Sd/cZAvxbJtOUSkvEGX1aBohpsqI6fBe93bdC5Qm8Tdzaynp0G5wKtydj/jr75z12fbtqMzbIjPPzihPz2LpLw12XtcKrl3j1uZL6amIr6xgIMkJ5krJw=====',
    expected: '9e2ab68fa28f06215823db585ac3ae8911eed3b2'
  }, {
    message: 'tYcwtriMI4BRcZhY3Nyc1Xk/uLC3WJXfW0ywwa+XPG64msZ1W9hEOY7gY5ty4Z2eYNuyXDprLMW1zTXDxD/KsIzZ1F3EbS9sS8TIIneLsnh+xtMjILXhvp7WItJ31au5u7On2N9kgnc3hUXTzCjI0ZKOeKuzMyudgrWcxEyUQchNwSzZmorLvkxRLCTXkUSQcpljr9mj1UprKCTbpFJEs8Gbun2OiIGkqiyPkJ8rh6vE1XKmXrelWSuKLrWXWbVH4zFdiHtcRkPDXLJ4vlfEwTZWIYojXA==',
    expected: 'a750ffcf4275ae0b0bd537ed40d2e671dfe47fb3'
  }, {
    message: 'tYcwtriMI4BRcZhY3Nyc1Xk/uLC3WJXfW0ywwa+XPG64msZ1W9hEOY7gY5ty4Z2eYNuyXDprLMW1zTXDxD/KsIzZ1F3EbS9sS8TIIneLsnh+xtMjILXhvp7WItJ31au5u7On2N9kgnc3hUXTzCjI0ZKOeKuzMyudgrWcxEyUQchNwSzZmorLvkxRLCTXkUSQcpljr9mj1UprKCTbpFJEs8Gbun2OiIGkqiyPkJ8rh6vE1XKmXrelWSuKLrWXWbVH4zFdiHtcRkPDXLJ4vlfEwTZWIYojXA===',
    expected: 'edc9eaa48db4f1415a0a12a85eac5bbf26ca568f'
  }, {
    message: 'tYcwtriMI4BRcZhY3Nyc1Xk/uLC3WJXfW0ywwa+XPG64msZ1W9hEOY7gY5ty4Z2eYNuyXDprLMW1zTXDxD/KsIzZ1F3EbS9sS8TIIneLsnh+xtMjILXhvp7WItJ31au5u7On2N9kgnc3hUXTzCjI0ZKOeKuzMyudgrWcxEyUQchNwSzZmorLvkxRLCTXkUSQcpljr9mj1UprKCTbpFJEs8Gbun2OiIGkqiyPkJ8rh6vE1XKmXrelWSuKLrWXWbVH4zFdiHtcRkPDXLJ4vlfEwTZWIYojXA====',
    expected: '8ed205be7bb3fd809de3c8b4d540058fc9a5fd70'
  }, {
    message: 'tYcwtriMI4BRcZhY3Nyc1Xk/uLC3WJXfW0ywwa+XPG64msZ1W9hEOY7gY5ty4Z2eYNuyXDprLMW1zTXDxD/KsIzZ1F3EbS9sS8TIIneLsnh+xtMjILXhvp7WItJ31au5u7On2N9kgnc3hUXTzCjI0ZKOeKuzMyudgrWcxEyUQchNwSzZmorLvkxRLCTXkUSQcpljr9mj1UprKCTbpFJEs8Gbun2OiIGkqiyPkJ8rh6vE1XKmXrelWSuKLrWXWbVH4zFdiHtcRkPDXLJ4vlfEwTZWIYojXA=====',
    expected: '4e01e5f57506a7ccb44d0624e1b47f80af0661fa'
  }, {
    message: 'b3GD3C1Zs9DiWswkwWulp0hJSd5jxtLMcOGNslVDz0Jul8vivHDIlH+khJgoabJEKVqBn4pZjH+GqW7ES6KCILicq8lBIq1i3Hw4TNd6rJq8madjRk66aJLMmq63SnO5h56ooqTIu02xmri+lpQ+Y04noZjVxn2uetalf4hNZFckKc6XxS12e8tQZEthf6iPT7V8p3Cvd1+Xi9Hdp0NIeXE2rMho2a3KuLqOyZ5EnI1Ha3Vsh+DLUDOXLnCNg6qhq2fWcbaWzCmvUHOqUkkvw6tV14JFSKpwow==',
    expected: '71e1db0cf15de9e15aa9334ecb2793243574199e'
  }, {
    message: 'b3GD3C1Zs9DiWswkwWulp0hJSd5jxtLMcOGNslVDz0Jul8vivHDIlH+khJgoabJEKVqBn4pZjH+GqW7ES6KCILicq8lBIq1i3Hw4TNd6rJq8madjRk66aJLMmq63SnO5h56ooqTIu02xmri+lpQ+Y04noZjVxn2uetalf4hNZFckKc6XxS12e8tQZEthf6iPT7V8p3Cvd1+Xi9Hdp0NIeXE2rMho2a3KuLqOyZ5EnI1Ha3Vsh+DLUDOXLnCNg6qhq2fWcbaWzCmvUHOqUkkvw6tV14JFSKpwow===',
    expected: '7cb99dbcd961e722b1c6e4eef0e5a37111cea11a'
  }, {
    message: 'b3GD3C1Zs9DiWswkwWulp0hJSd5jxtLMcOGNslVDz0Jul8vivHDIlH+khJgoabJEKVqBn4pZjH+GqW7ES6KCILicq8lBIq1i3Hw4TNd6rJq8madjRk66aJLMmq63SnO5h56ooqTIu02xmri+lpQ+Y04noZjVxn2uetalf4hNZFckKc6XxS12e8tQZEthf6iPT7V8p3Cvd1+Xi9Hdp0NIeXE2rMho2a3KuLqOyZ5EnI1Ha3Vsh+DLUDOXLnCNg6qhq2fWcbaWzCmvUHOqUkkvw6tV14JFSKpwow====',
    expected: '82500d58ebe6c90958cebc975d03a0e5a02741c1'
  }, {
    message: 'b3GD3C1Zs9DiWswkwWulp0hJSd5jxtLMcOGNslVDz0Jul8vivHDIlH+khJgoabJEKVqBn4pZjH+GqW7ES6KCILicq8lBIq1i3Hw4TNd6rJq8madjRk66aJLMmq63SnO5h56ooqTIu02xmri+lpQ+Y04noZjVxn2uetalf4hNZFckKc6XxS12e8tQZEthf6iPT7V8p3Cvd1+Xi9Hdp0NIeXE2rMho2a3KuLqOyZ5EnI1Ha3Vsh+DLUDOXLnCNg6qhq2fWcbaWzCmvUHOqUkkvw6tV14JFSKpwow=====',
    expected: '1e470f193a063f354adb7365d72dc5e08a15a3ed'
  }, {
    message: 'MTqrzJCJq201Z7vEwzViO7RRfaEgqCExm4WbL0WJo86Gops3pyVi16rjmdiFxdObSpkyYN08JVdlQKSITcxPoISjzjhNz1QyxorcJIqOZTpRSixfrseLu92qVU1xp9xoqVW2i8paUODZZHF6OrhekVqfJj3cOICXnVGFMaZxOscnYJ22WypbwV3fo9N/XeNEsNO+u3pP4qBUaUo4u3493Zk41LOZrZ1xsOBkQ0JUSUR0KHW7tZtcuD7DITqmyNxhcZiPl0ainaam19VDqU/JxpnIwtvAhlNOjsc0tg==',
    expected: '36eab54289d66563f934ec294840c7657ded8a7f'
  }, {
    message: 'MTqrzJCJq201Z7vEwzViO7RRfaEgqCExm4WbL0WJo86Gops3pyVi16rjmdiFxdObSpkyYN08JVdlQKSITcxPoISjzjhNz1QyxorcJIqOZTpRSixfrseLu92qVU1xp9xoqVW2i8paUODZZHF6OrhekVqfJj3cOICXnVGFMaZxOscnYJ22WypbwV3fo9N/XeNEsNO+u3pP4qBUaUo4u3493Zk41LOZrZ1xsOBkQ0JUSUR0KHW7tZtcuD7DITqmyNxhcZiPl0ainaam19VDqU/JxpnIwtvAhlNOjsc0tg===',
    expected: '98210fec66ae9e2f6cae232b4828c47a2dbc9aa2'
  }, {
    message: 'MTqrzJCJq201Z7vEwzViO7RRfaEgqCExm4WbL0WJo86Gops3pyVi16rjmdiFxdObSpkyYN08JVdlQKSITcxPoISjzjhNz1QyxorcJIqOZTpRSixfrseLu92qVU1xp9xoqVW2i8paUODZZHF6OrhekVqfJj3cOICXnVGFMaZxOscnYJ22WypbwV3fo9N/XeNEsNO+u3pP4qBUaUo4u3493Zk41LOZrZ1xsOBkQ0JUSUR0KHW7tZtcuD7DITqmyNxhcZiPl0ainaam19VDqU/JxpnIwtvAhlNOjsc0tg====',
    expected: '5d311a74d04ce78f0a2409b0bab42af1cfee9d2c'
  }, {
    message: 'MTqrzJCJq201Z7vEwzViO7RRfaEgqCExm4WbL0WJo86Gops3pyVi16rjmdiFxdObSpkyYN08JVdlQKSITcxPoISjzjhNz1QyxorcJIqOZTpRSixfrseLu92qVU1xp9xoqVW2i8paUODZZHF6OrhekVqfJj3cOICXnVGFMaZxOscnYJ22WypbwV3fo9N/XeNEsNO+u3pP4qBUaUo4u3493Zk41LOZrZ1xsOBkQ0JUSUR0KHW7tZtcuD7DITqmyNxhcZiPl0ainaam19VDqU/JxpnIwtvAhlNOjsc0tg=====',
    expected: '8809efaa7f231738b7faddc792ba10305ca33273'
  }, {
    message: 'gqbQz6yIgDbYqmVbx1+TnE7PvVnN27HGgc+DS6Fea4Jr0kRrrsBy25/S28ZikHkug0fFU25zwC+5inZ1yjVywdyfTIZfVtOqzUVs0+A/r9sw13XiVosyrVnBTNpiereEZnNmI0TGQYclb4ut1l+m26EpYbvUr7uwc6OISFes1IDBvDnacLc0lWB1LIZXkm9YisiilyCLcGi4L3tRh4M1SXcmNpedujbYVttA4txDKJVVTmDQTakvpJXM4K2UO9eUxzNx2FJyzXjZgY2jPbFEmGHekL23InFphkxk2oSPJQ==',
    expected: 'd517d43de251d7744f5a814f8a0eac46e00d36dd'
  }, {
    message: 'gqbQz6yIgDbYqmVbx1+TnE7PvVnN27HGgc+DS6Fea4Jr0kRrrsBy25/S28ZikHkug0fFU25zwC+5inZ1yjVywdyfTIZfVtOqzUVs0+A/r9sw13XiVosyrVnBTNpiereEZnNmI0TGQYclb4ut1l+m26EpYbvUr7uwc6OISFes1IDBvDnacLc0lWB1LIZXkm9YisiilyCLcGi4L3tRh4M1SXcmNpedujbYVttA4txDKJVVTmDQTakvpJXM4K2UO9eUxzNx2FJyzXjZgY2jPbFEmGHekL23InFphkxk2oSPJQ===',
    expected: '3141439ef1ca05388e2b1c24d506e6fd215120ac'
  }, {
    message: 'gqbQz6yIgDbYqmVbx1+TnE7PvVnN27HGgc+DS6Fea4Jr0kRrrsBy25/S28ZikHkug0fFU25zwC+5inZ1yjVywdyfTIZfVtOqzUVs0+A/r9sw13XiVosyrVnBTNpiereEZnNmI0TGQYclb4ut1l+m26EpYbvUr7uwc6OISFes1IDBvDnacLc0lWB1LIZXkm9YisiilyCLcGi4L3tRh4M1SXcmNpedujbYVttA4txDKJVVTmDQTakvpJXM4K2UO9eUxzNx2FJyzXjZgY2jPbFEmGHekL23InFphkxk2oSPJQ====',
    expected: '2d4789235d3681d7fb533798ba89dddb23ef9819'
  }, {
    message: 'gqbQz6yIgDbYqmVbx1+TnE7PvVnN27HGgc+DS6Fea4Jr0kRrrsBy25/S28ZikHkug0fFU25zwC+5inZ1yjVywdyfTIZfVtOqzUVs0+A/r9sw13XiVosyrVnBTNpiereEZnNmI0TGQYclb4ut1l+m26EpYbvUr7uwc6OISFes1IDBvDnacLc0lWB1LIZXkm9YisiilyCLcGi4L3tRh4M1SXcmNpedujbYVttA4txDKJVVTmDQTakvpJXM4K2UO9eUxzNx2FJyzXjZgY2jPbFEmGHekL23InFphkxk2oSPJQ=====',
    expected: '56eae53dd3bf095b37adb9311d3f41eef094af8c'
  }, {
    message: 'UkmOSjfLbcaUW83VklUnq1eSoDyk04XicSLQmsg64oe7OL+IZ+DbItEzd8Hgmn5FW9lyYTxWp7Yjlihgk26ChdKSNo5gMj+rLytrgLResDy5RV6v3dtpkLdWOYpk17vFKuFDhpixQ2hjfFwozC3YXJyWikVOe9AzOiZxbpumVpeE2qEij7B9k3E2cNVJfDg5ilhjrSeohyyVUbDFZymfWTguu0lel0AkVFs+dK4thLyWz480IFCWSDPfZOKsZ+N2Q5Vsc8I2lqesVoBHKHE1qDCbv01BcZGPRbnPKJkqnCpHSw==',
    expected: 'd4fd76849dc2424f29064517da7327a9dc63b967'
  }, {
    message: 'UkmOSjfLbcaUW83VklUnq1eSoDyk04XicSLQmsg64oe7OL+IZ+DbItEzd8Hgmn5FW9lyYTxWp7Yjlihgk26ChdKSNo5gMj+rLytrgLResDy5RV6v3dtpkLdWOYpk17vFKuFDhpixQ2hjfFwozC3YXJyWikVOe9AzOiZxbpumVpeE2qEij7B9k3E2cNVJfDg5ilhjrSeohyyVUbDFZymfWTguu0lel0AkVFs+dK4thLyWz480IFCWSDPfZOKsZ+N2Q5Vsc8I2lqesVoBHKHE1qDCbv01BcZGPRbnPKJkqnCpHSw===',
    expected: '0b82d18d4e8e32aa2eb782087d85b23141c58a57'
  }, {
    message: 'UkmOSjfLbcaUW83VklUnq1eSoDyk04XicSLQmsg64oe7OL+IZ+DbItEzd8Hgmn5FW9lyYTxWp7Yjlihgk26ChdKSNo5gMj+rLytrgLResDy5RV6v3dtpkLdWOYpk17vFKuFDhpixQ2hjfFwozC3YXJyWikVOe9AzOiZxbpumVpeE2qEij7B9k3E2cNVJfDg5ilhjrSeohyyVUbDFZymfWTguu0lel0AkVFs+dK4thLyWz480IFCWSDPfZOKsZ+N2Q5Vsc8I2lqesVoBHKHE1qDCbv01BcZGPRbnPKJkqnCpHSw====',
    expected: 'e3dd370daa5b5730dae6b22f8000e099e98185d6'
  }, {
    message: 'UkmOSjfLbcaUW83VklUnq1eSoDyk04XicSLQmsg64oe7OL+IZ+DbItEzd8Hgmn5FW9lyYTxWp7Yjlihgk26ChdKSNo5gMj+rLytrgLResDy5RV6v3dtpkLdWOYpk17vFKuFDhpixQ2hjfFwozC3YXJyWikVOe9AzOiZxbpumVpeE2qEij7B9k3E2cNVJfDg5ilhjrSeohyyVUbDFZymfWTguu0lel0AkVFs+dK4thLyWz480IFCWSDPfZOKsZ+N2Q5Vsc8I2lqesVoBHKHE1qDCbv01BcZGPRbnPKJkqnCpHSw=====',
    expected: 'b5e1e81031e272f1cca4fb6e1a8fc0399a452019'
  }, {
    message: 'mFTaoMQt0sKoUMEiSVu5I7KhtFlJvXWPbIwlf1IutDtjo7I/zTqcWSDQrYo3PHlY39HjSU7baWuHsMksSsvhVTSRtIykm8jCm5hvzGFL1YC0oEREssgw1aLLRZGLxYaMXrEpcmdRwrKLnKxMRJhNw1ZiYSNeZZwooZPhN5c7XHiqraTfwSo2ZnRuMLN+zK/ecohe3oHXxZsrt99yjD96TnE5uy6BmZLYW7yIyF+vUnNF3sRYVpPTNENpxtSYha7fUDFjcHEzeVDRZa9IZapjMnObsHCTs7F7dd2oLqKqZneRJb9Qjw==',
    expected: '88ba9b8e5ae96bdc0cecdc1085c491e3819b536c'
  }, {
    message: 'mFTaoMQt0sKoUMEiSVu5I7KhtFlJvXWPbIwlf1IutDtjo7I/zTqcWSDQrYo3PHlY39HjSU7baWuHsMksSsvhVTSRtIykm8jCm5hvzGFL1YC0oEREssgw1aLLRZGLxYaMXrEpcmdRwrKLnKxMRJhNw1ZiYSNeZZwooZPhN5c7XHiqraTfwSo2ZnRuMLN+zK/ecohe3oHXxZsrt99yjD96TnE5uy6BmZLYW7yIyF+vUnNF3sRYVpPTNENpxtSYha7fUDFjcHEzeVDRZa9IZapjMnObsHCTs7F7dd2oLqKqZneRJb9Qjw===',
    expected: 'c832445f847197b583760df4c41bfecbfa0eb870'
  }, {
    message: 'mFTaoMQt0sKoUMEiSVu5I7KhtFlJvXWPbIwlf1IutDtjo7I/zTqcWSDQrYo3PHlY39HjSU7baWuHsMksSsvhVTSRtIykm8jCm5hvzGFL1YC0oEREssgw1aLLRZGLxYaMXrEpcmdRwrKLnKxMRJhNw1ZiYSNeZZwooZPhN5c7XHiqraTfwSo2ZnRuMLN+zK/ecohe3oHXxZsrt99yjD96TnE5uy6BmZLYW7yIyF+vUnNF3sRYVpPTNENpxtSYha7fUDFjcHEzeVDRZa9IZapjMnObsHCTs7F7dd2oLqKqZneRJb9Qjw====',
    expected: '1adc7bf698684c3f7a6f450b1e5c965a6d37f9ed'
  }, {
    message: 'mFTaoMQt0sKoUMEiSVu5I7KhtFlJvXWPbIwlf1IutDtjo7I/zTqcWSDQrYo3PHlY39HjSU7baWuHsMksSsvhVTSRtIykm8jCm5hvzGFL1YC0oEREssgw1aLLRZGLxYaMXrEpcmdRwrKLnKxMRJhNw1ZiYSNeZZwooZPhN5c7XHiqraTfwSo2ZnRuMLN+zK/ecohe3oHXxZsrt99yjD96TnE5uy6BmZLYW7yIyF+vUnNF3sRYVpPTNENpxtSYha7fUDFjcHEzeVDRZa9IZapjMnObsHCTs7F7dd2oLqKqZneRJb9Qjw=====',
    expected: 'eb9a3190600c01cf543fcf89fd0e3ebbd5fe784d'
  }, {
    message: 'toMgLD49yCdAYd+eXsI2vpWd3ip50CrSor7Fb3Ugv4dHXnc5tNFOfNqJi22VXtgl40aVQq9JkFbTsdkueZSWVqUoNZRrykCqjMThVraLg4PiLsO8N4ubsosrubmpxG5mbbqX1IFMeWK0M6hcwZWtec8zezzXtHwxgm/MkautsVVbp1HGbmithtBZLN6GNTF6nKIw1ipnWSq+IDjjyr4wLyRGgWM40DJNZlxecoRYkFi84JcslE2PKU5DZmSZy82cxjtDzIwsd9x5hd5kxtnfM8B6w7SpMnV31ilaYSxCsKh0cbYnWGW8Tw==',
    expected: '6329a204d1c0c572bcd0bf5d5fc50f91d26f62fe'
  }, {
    message: 'toMgLD49yCdAYd+eXsI2vpWd3ip50CrSor7Fb3Ugv4dHXnc5tNFOfNqJi22VXtgl40aVQq9JkFbTsdkueZSWVqUoNZRrykCqjMThVraLg4PiLsO8N4ubsosrubmpxG5mbbqX1IFMeWK0M6hcwZWtec8zezzXtHwxgm/MkautsVVbp1HGbmithtBZLN6GNTF6nKIw1ipnWSq+IDjjyr4wLyRGgWM40DJNZlxecoRYkFi84JcslE2PKU5DZmSZy82cxjtDzIwsd9x5hd5kxtnfM8B6w7SpMnV31ilaYSxCsKh0cbYnWGW8Tw===',
    expected: '30a2d9bc32b798df98fcd470ed919494b08a36d8'
  }, {
    message: 'toMgLD49yCdAYd+eXsI2vpWd3ip50CrSor7Fb3Ugv4dHXnc5tNFOfNqJi22VXtgl40aVQq9JkFbTsdkueZSWVqUoNZRrykCqjMThVraLg4PiLsO8N4ubsosrubmpxG5mbbqX1IFMeWK0M6hcwZWtec8zezzXtHwxgm/MkautsVVbp1HGbmithtBZLN6GNTF6nKIw1ipnWSq+IDjjyr4wLyRGgWM40DJNZlxecoRYkFi84JcslE2PKU5DZmSZy82cxjtDzIwsd9x5hd5kxtnfM8B6w7SpMnV31ilaYSxCsKh0cbYnWGW8Tw====',
    expected: '3231e0e6338b065740d08920ec1684f542d0d814'
  }, {
    message: 'toMgLD49yCdAYd+eXsI2vpWd3ip50CrSor7Fb3Ugv4dHXnc5tNFOfNqJi22VXtgl40aVQq9JkFbTsdkueZSWVqUoNZRrykCqjMThVraLg4PiLsO8N4ubsosrubmpxG5mbbqX1IFMeWK0M6hcwZWtec8zezzXtHwxgm/MkautsVVbp1HGbmithtBZLN6GNTF6nKIw1ipnWSq+IDjjyr4wLyRGgWM40DJNZlxecoRYkFi84JcslE2PKU5DZmSZy82cxjtDzIwsd9x5hd5kxtnfM8B6w7SpMnV31ilaYSxCsKh0cbYnWGW8Tw=====',
    expected: 'a8fc211b15a549828bfe8a6049f490abf1ecc0df'
  }, {
    message: 'KJx7xLM2e+DcS8SsRCs3Vd2GUJBhdX+DdttwLNeoi1WNlcsvIuN+kFrhfsbLzM++zLqcncKLu+Kcy5jXtCrKV60xJeBhZDo5LmRwv6GWrFdxtKhOQylzy0B5KSp5QE1KiGd7flRxtTW9ssXiWqmuVKxsQnvepmzPKqXUxiXRbjebOF3VdrpxqnFjJHJE4YPgYTGCfk2Aid3bdqZavrVQ1aJ84eE1pFHidk1aNX5MnjZJI6mNXpCNbbl+yLtHMXiUfOBkX0rPwLfidUmgQJ+uub5Pw1dV2SFhQ3nYcC5Lfqt2rkdFdJvUlpvUZg==',
    expected: 'ece96a073511f85f867ea27b39ba19172a3463f5'
  }, {
    message: 'KJx7xLM2e+DcS8SsRCs3Vd2GUJBhdX+DdttwLNeoi1WNlcsvIuN+kFrhfsbLzM++zLqcncKLu+Kcy5jXtCrKV60xJeBhZDo5LmRwv6GWrFdxtKhOQylzy0B5KSp5QE1KiGd7flRxtTW9ssXiWqmuVKxsQnvepmzPKqXUxiXRbjebOF3VdrpxqnFjJHJE4YPgYTGCfk2Aid3bdqZavrVQ1aJ84eE1pFHidk1aNX5MnjZJI6mNXpCNbbl+yLtHMXiUfOBkX0rPwLfidUmgQJ+uub5Pw1dV2SFhQ3nYcC5Lfqt2rkdFdJvUlpvUZg===',
    expected: '8ce1f821e3563d696d3b38ef82dc675711c41d8f'
  }, {
    message: 'KJx7xLM2e+DcS8SsRCs3Vd2GUJBhdX+DdttwLNeoi1WNlcsvIuN+kFrhfsbLzM++zLqcncKLu+Kcy5jXtCrKV60xJeBhZDo5LmRwv6GWrFdxtKhOQylzy0B5KSp5QE1KiGd7flRxtTW9ssXiWqmuVKxsQnvepmzPKqXUxiXRbjebOF3VdrpxqnFjJHJE4YPgYTGCfk2Aid3bdqZavrVQ1aJ84eE1pFHidk1aNX5MnjZJI6mNXpCNbbl+yLtHMXiUfOBkX0rPwLfidUmgQJ+uub5Pw1dV2SFhQ3nYcC5Lfqt2rkdFdJvUlpvUZg====',
    expected: '711c6a4638ea6620242115ae1796cfe67085f847'
  }, {
    message: 'KJx7xLM2e+DcS8SsRCs3Vd2GUJBhdX+DdttwLNeoi1WNlcsvIuN+kFrhfsbLzM++zLqcncKLu+Kcy5jXtCrKV60xJeBhZDo5LmRwv6GWrFdxtKhOQylzy0B5KSp5QE1KiGd7flRxtTW9ssXiWqmuVKxsQnvepmzPKqXUxiXRbjebOF3VdrpxqnFjJHJE4YPgYTGCfk2Aid3bdqZavrVQ1aJ84eE1pFHidk1aNX5MnjZJI6mNXpCNbbl+yLtHMXiUfOBkX0rPwLfidUmgQJ+uub5Pw1dV2SFhQ3nYcC5Lfqt2rkdFdJvUlpvUZg=====',
    expected: '33609274cc60db121cda98335e0ba1f65e172ac0'
  }, {
    message: 'YqEgZUrh2NfGtm3HbFuHTYEzuKejtlPQkZWB0jPahq7UfJlBKmnF4THftp6yIpeHguBHjjva0rbcxn5WtUTYuJFlV3fSNp55k6/DxC/Wz61Hh8fBI86qpjOKL0qee3femcxgs9xHacZPsi+/0C6aWngqXCePR3MkjiErOOHP2NOBxTdJlkSx2VXGfsDEXaKCems8PGKEL6s20lNLpWvSt2JoTJNiIH6yp88qdD88299Adc2QcTldmC9FYauMtbJ8NXzNw1pfSDXUJJ08mnV1zUI+J3kjIJxtlF+7Zt1TQtuuNoY+v1t8lm2fqEGnmQ==',
    expected: 'eb1c821a656925fa14e4ea0b38c00681b4b46f36'
  }, {
    message: 'YqEgZUrh2NfGtm3HbFuHTYEzuKejtlPQkZWB0jPahq7UfJlBKmnF4THftp6yIpeHguBHjjva0rbcxn5WtUTYuJFlV3fSNp55k6/DxC/Wz61Hh8fBI86qpjOKL0qee3femcxgs9xHacZPsi+/0C6aWngqXCePR3MkjiErOOHP2NOBxTdJlkSx2VXGfsDEXaKCems8PGKEL6s20lNLpWvSt2JoTJNiIH6yp88qdD88299Adc2QcTldmC9FYauMtbJ8NXzNw1pfSDXUJJ08mnV1zUI+J3kjIJxtlF+7Zt1TQtuuNoY+v1t8lm2fqEGnmQ===',
    expected: '01b5204da9dad80f28bebec24664837b1481fac5'
  }, {
    message: 'YqEgZUrh2NfGtm3HbFuHTYEzuKejtlPQkZWB0jPahq7UfJlBKmnF4THftp6yIpeHguBHjjva0rbcxn5WtUTYuJFlV3fSNp55k6/DxC/Wz61Hh8fBI86qpjOKL0qee3femcxgs9xHacZPsi+/0C6aWngqXCePR3MkjiErOOHP2NOBxTdJlkSx2VXGfsDEXaKCems8PGKEL6s20lNLpWvSt2JoTJNiIH6yp88qdD88299Adc2QcTldmC9FYauMtbJ8NXzNw1pfSDXUJJ08mnV1zUI+J3kjIJxtlF+7Zt1TQtuuNoY+v1t8lm2fqEGnmQ====',
    expected: '3940c2bc50b0f03e97f693589d53f6aeae54bd1d'
  }, {
    message: 'YqEgZUrh2NfGtm3HbFuHTYEzuKejtlPQkZWB0jPahq7UfJlBKmnF4THftp6yIpeHguBHjjva0rbcxn5WtUTYuJFlV3fSNp55k6/DxC/Wz61Hh8fBI86qpjOKL0qee3femcxgs9xHacZPsi+/0C6aWngqXCePR3MkjiErOOHP2NOBxTdJlkSx2VXGfsDEXaKCems8PGKEL6s20lNLpWvSt2JoTJNiIH6yp88qdD88299Adc2QcTldmC9FYauMtbJ8NXzNw1pfSDXUJJ08mnV1zUI+J3kjIJxtlF+7Zt1TQtuuNoY+v1t8lm2fqEGnmQ=====',
    expected: 'da42b7aa700c8d171a42ee83b75afe4b7b0dc4fa'
  }, {
    message: 'sramI5Q9TJHcOLwkbMvdMo4oQZSXJ0Z2uyaPxICrfaXVwmeMPi1xeKMxsEp3OIGkl6DiUdg/hYLHTkDeXG20rqeXwpOugTfNaN/hzV9+xZWihXaGpZOkv7JGYzrf4S+PQjqFqFiFn2KIrXB5hcTQaslWiX/MSWi8oV+8eaxTx6VYhTVQbM2CN2RJgqYxxY/id3Rx41KGK+DUf7m/Vqx7ocCXgdqcfsZRbz1cvjWckai0f3GPilsn0J2YhJicPbmpotHfIM+P0H9XPyWhnzV8qoO2S2BuhSG4rbCYbk26R3uFo9KdISTHU2DSMShPKXfgNg==',
    expected: 'bbb07658d7ebe382ddebeac4ca1e399d3d228523'
  }, {
    message: 'sramI5Q9TJHcOLwkbMvdMo4oQZSXJ0Z2uyaPxICrfaXVwmeMPi1xeKMxsEp3OIGkl6DiUdg/hYLHTkDeXG20rqeXwpOugTfNaN/hzV9+xZWihXaGpZOkv7JGYzrf4S+PQjqFqFiFn2KIrXB5hcTQaslWiX/MSWi8oV+8eaxTx6VYhTVQbM2CN2RJgqYxxY/id3Rx41KGK+DUf7m/Vqx7ocCXgdqcfsZRbz1cvjWckai0f3GPilsn0J2YhJicPbmpotHfIM+P0H9XPyWhnzV8qoO2S2BuhSG4rbCYbk26R3uFo9KdISTHU2DSMShPKXfgNg===',
    expected: '21ed79f2b3a36688764b6e2662bbd2ca6c14b28e'
  }, {
    message: 'sramI5Q9TJHcOLwkbMvdMo4oQZSXJ0Z2uyaPxICrfaXVwmeMPi1xeKMxsEp3OIGkl6DiUdg/hYLHTkDeXG20rqeXwpOugTfNaN/hzV9+xZWihXaGpZOkv7JGYzrf4S+PQjqFqFiFn2KIrXB5hcTQaslWiX/MSWi8oV+8eaxTx6VYhTVQbM2CN2RJgqYxxY/id3Rx41KGK+DUf7m/Vqx7ocCXgdqcfsZRbz1cvjWckai0f3GPilsn0J2YhJicPbmpotHfIM+P0H9XPyWhnzV8qoO2S2BuhSG4rbCYbk26R3uFo9KdISTHU2DSMShPKXfgNg=====',
    expected: 'd1ee68ca571fe4b32a9294b594ba93cf4b549e4c'
  }, {
    message: 'e7m9I8pkYjSLSjOFxZBm4d1FIqp6J9CSNDF1hrqJi18sbiLMoljbbsizhE9ee08hilTbNzmCh5ex21Vdj92sqjRr4pClokThILOoIHPUUpe4e6eVkihvPYVNIn7Fw1JomLneSLKZL7acQCw3nlOZgH64fybY1VmFXyLRNapb1zd6gD5tbyVlQ3uipnSa1liTiKSNtK5/SFYlNch5wY+vxLS54MZBjV6fa7DNgdfE1aS2UyZlVkjT1m8iIolYn4CVN3W6MFa5jc1qUDLUXm/Pr8gl3pcrvE1Y3ylbUjdEZ1aCl4HUvry9fos/dcBq10SAQ9mJ4A==',
    expected: 'f2763e9091637ab74d8d5bb1e4cc441a4f1d0ba7'
  }, {
    message: 'e7m9I8pkYjSLSjOFxZBm4d1FIqp6J9CSNDF1hrqJi18sbiLMoljbbsizhE9ee08hilTbNzmCh5ex21Vdj92sqjRr4pClokThILOoIHPUUpe4e6eVkihvPYVNIn7Fw1JomLneSLKZL7acQCw3nlOZgH64fybY1VmFXyLRNapb1zd6gD5tbyVlQ3uipnSa1liTiKSNtK5/SFYlNch5wY+vxLS54MZBjV6fa7DNgdfE1aS2UyZlVkjT1m8iIolYn4CVN3W6MFa5jc1qUDLUXm/Pr8gl3pcrvE1Y3ylbUjdEZ1aCl4HUvry9fos/dcBq10SAQ9mJ4A===',
    expected: '78221a86bbf24fde7d2b4dd7036bd3dd2d0d7a97'
  }, {
    message: 'e7m9I8pkYjSLSjOFxZBm4d1FIqp6J9CSNDF1hrqJi18sbiLMoljbbsizhE9ee08hilTbNzmCh5ex21Vdj92sqjRr4pClokThILOoIHPUUpe4e6eVkihvPYVNIn7Fw1JomLneSLKZL7acQCw3nlOZgH64fybY1VmFXyLRNapb1zd6gD5tbyVlQ3uipnSa1liTiKSNtK5/SFYlNch5wY+vxLS54MZBjV6fa7DNgdfE1aS2UyZlVkjT1m8iIolYn4CVN3W6MFa5jc1qUDLUXm/Pr8gl3pcrvE1Y3ylbUjdEZ1aCl4HUvry9fos/dcBq10SAQ9mJ4A====',
    expected: '62f199398106225ac05b6aaa1f1c05f01ed41c02'
  }, {
    message: 'e7m9I8pkYjSLSjOFxZBm4d1FIqp6J9CSNDF1hrqJi18sbiLMoljbbsizhE9ee08hilTbNzmCh5ex21Vdj92sqjRr4pClokThILOoIHPUUpe4e6eVkihvPYVNIn7Fw1JomLneSLKZL7acQCw3nlOZgH64fybY1VmFXyLRNapb1zd6gD5tbyVlQ3uipnSa1liTiKSNtK5/SFYlNch5wY+vxLS54MZBjV6fa7DNgdfE1aS2UyZlVkjT1m8iIolYn4CVN3W6MFa5jc1qUDLUXm/Pr8gl3pcrvE1Y3ylbUjdEZ1aCl4HUvry9fos/dcBq10SAQ9mJ4A=====',
    expected: 'e1d67d5a45b53273d48f6af1f89472b5eb5b8728'
  }, {
    message: 'TLRjJXN6bJmps3iUprU2ULJ6c50lMa6gImI2PZzFlaLZs1uvxyWzk48idVh6LsS13E3Lk95DY9WkKNWtLkFwOkVzMGCcU080Vq+9npYlOymReowrmEDKV83AzWBxaWGSnGh/O192KSctQDMytGFBS5RoUYlo2jglVJ5/r0VSJ2jSj9heJV+dbsyYUp2xd71MIFN4P7aLnrUzgJeuWnpz3GXfV6mvi6dZt7RAwaaN1sdpa1i5WJDR4lCn4L9HzF2jQyNMnnk2pdVxkrHg0rfWduN9hZzfxDGmV0rZp38tUDgyzyJRRVpQmZQjgbEgsKeoQFnMR3d1lQ==',
    expected: '82627fd1f0fff026671b23498855c7b1046771ed'
  }])('computes [%#]', _ref => {
    let {
      message,
      expected
    } = _ref;
    (0, _globals.expect)((0, _byte_utils.bytesToHex)((0, _sha.sha1)(message))).toBe(expected);
  });
  _globals.it.each([{
    message: 'L',
    expected: [1283457024, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8]
  }, {
    message: 'Lo',
    expected: [1282375680, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]
  }, {
    message: 'Lor',
    expected: [1282372224, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24]
  }, {
    message: 'Lore',
    expected: [1282372197, 2147483648, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32]
  }, {
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    expected: [1282372197, 1830840688, 1937075488, 1685023855, 1914729321, 1948279149, 1702112288, 1668247155, 1701016677, 1953853984, 1633970544, 1769169769, 1852252261, 1818850432, 0, 440] // eslint-disable-line @stylistic/max-len
  }, {
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    expected: [1282372197, 1830840688, 1937075488, 1685023855, 1914729321, 1948279149, 1702112288, 1668247155, 1701016677, 1953853984, 1633970544, 1769169769, 1852252261, 1818850350, 2147483648, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 448] // eslint-disable-line @stylistic/max-len
  }])('prepares text [%#]', _ref2 => {
    let {
      message,
      expected
    } = _ref2;
    (0, _globals.expect)((0, _sha.preprocess)(message).toString()).toBe(expected.toString());
  });
});
