import {
  anXQ,
  bo,
  ccc,
  cll,
  dau,
  dinh,
  dit,
  kep,
  kl,
  lcc,
  lll,
  nnn,
  ntt,
  tnn,
  tong,
  ttt,
} from "@/utils/DataBo";
import {
  dataBaCang,
  dataDe,
  dataLo,
  dataXien,
  dataXienNhay,
} from "@/utils/DataSelect";
import {
  calculateXien,
  calculateXN,
  chunk,
  countOccurrences,
  removeAccents,
} from "@/utils/helper";
import Select from "@/utils/Select";
import { useCallback, useEffect, useState } from "react";

const keywords = ["lo", "l0", "de", "bc", "xien,xn", "xien", "xq", "xn"];

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [de_kq, setDe_kq] = useState<any>();
  const [lo_kq, setLo_kq] = useState<any[]>([]);
  const [bc_kq, setBc_kq] = useState<any>();
  const [loHtml, setLoHtml] = useState("");
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [analyzeInput, setAnalyzeInput] = useState([]);

  const [lo, setLo] = useState([]);
  const [de, setDe] = useState([]);
  const [bc, setBC] = useState([]);
  const [xien, setXien] = useState([]);
  const [xiennhay, setXienNhay] = useState([]);
  const [xienquay, setXienQuay] = useState([]);

  const [finalLo, setFinalLo] = useState("");
  const [finalDe, setFinalDe] = useState("");
  const [finalBC, setFinalBC] = useState("");
  const [finalXien, setFinalXien] = useState("");
  const [finalXN, setFinalXN] = useState("");
  const [finalXQ, setFinalXQ] = useState("");

  const [xLo, setXLo] = useState(21.7);
  const [xDe, setXDe] = useState(0.72);
  const [xXien, setXXien] = useState(0.56);
  const [xXN, setXXN] = useState(1.2);
  const [xBC, setXBC] = useState(0.7);

  const [tongLo, setTongLo] = useState(0);
  const [tongDe, setTongDe] = useState(0);
  const [tongBC, setTongBC] = useState(0);
  const [tongXien, setTongXien] = useState(0);
  const [tongXN, setTongXN] = useState(0);
  const [tongXQ, setTongXQ] = useState(0);

  const [tongLoHit, setTongLoHit] = useState(0);
  const [tongDeHit, setTongDeHit] = useState(0);
  const [tongBCHit, setTongBCHit] = useState(0);
  const [tongXienHit, setTongXienHit] = useState(0);
  const [tongXNHit, setTongXNHit] = useState(0);
  const [tongXQHit, setTongXQHit] = useState(0);

  const [finalResult, setFinalResult] = useState("");
  const [selectedApi, setSelectedApi] = useState("xskt-net");

  useEffect(() => {
    fetchData();
  }, [selectedApi]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/${selectedApi}`);
      const result = await response.json();
      console.log(result);

      if (result.success) {
        setData(
          result.data.map((d: string) =>
            d
              .replace(/\s?\.\s/, "")
              .replace(/[\n\s]/, "")
              .trim()
          )
        );
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!data.length) return;
    setDe_kq(data[0].substr(-2));
    setBc_kq(data[0].substr(-3));

    let lo_kq:string[] = [];
    data.forEach((d) => {
      if (d.length < 3) {
        lo_kq.push(d);
      } else {
        lo_kq.push(d.substr(-2));
      }
    });

    lo_kq.sort();
    let loHtml = "";
    lo_kq.forEach((l) => (loHtml += l + ".."));
    setLo_kq(lo_kq);
    setLoHtml(loHtml);
  }, [data]);

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    text &&
      setFirstInput(
        removeAccents(text.toUpperCase())
          .replace(/[:;]/gim, "")
          .replace(/t(\w?)+\d?(?![\S\.\W]+)/gim, "") // remove tin1, tin2
          .replace(/\n/gim, " ")
          .replace(/(X)[,\s\.]+?(\d+)[KND]?/gim, "$1$2")
          .replace(
            /[,\s\.]+?(\d+)[,\.\s]?[KND]|[,\s\.]+(\d+[,\s\.]+?[KND][,\.\s])/gim,
            "X$1 "
          ) // .200k => x200
          .replace(/XX|\*|×/gim, "X")
          .replace(/K([,\s\.]+?\w)/gim, "$1") // remove lonely 'K'
          .replace(/(\d+)[DNK]/gim, "$1") // remove 'K'
          .replace(/^[\.\s]?[NDK]?[-,\.\s]+/gim, "") // remove currency
          .replace(/XIEN[\.\s]+QUAY[,\s\.]?(\d{1})[,\.\s]/gim, "..XQ $1")
          .replace(/XIEN[\.\s]+QUAY/gim, "..XQ")
          .replace(/DOI/gim, "2")
          .replace(/BA/gim, "3")
          .replace(/BON/gim, "4")
          .replace(/-/gim, "..")
          .replace(/[,\s\.]?TR(I)?(EU)?/gim, "000") // change currency
          .replace(/(\D{2}[\w\s\.]?)(XIEN)\d?(([\.\s]\d)?)[\.\s]/gim, "..XIEN ")
          .replace(/X[,\s\.]+XN/gim, "XIEN,XN")
          .replace(/\w+?[\.\s]?CANG|BA/gim, "..BC")
          .replace(/X[\.\s,]*?(\d+)/gim, "X$1")
          .replace(/KEP/gim, "DE KEP") // avoid Lo kep
          .replace(/kep[,\.\s]+lech|kep[,\.\s]+lec|kep[,\.\s]+l/gim, "..KL")
          .replace(/\W+[\s\.,]+BO|\D+[\.\s]?BO/gim, "..DE BO")
          .replace(/([-\D]+)DE/gim, "$1..DE") // break in safari - iphone
          .replace(/D(\d+?)/gim, "DE $1")
          .replace(/DUOI/gim, "..DIT ")

          .replace(/NH?O?[,\s]TO/gim, "..NHO_TO")
          .replace(/NH?O?[,\s]NH?O?/gim, "..NHO_NHO")
          .replace(/TO?[,\s]NH?O?/gim, "..TO_NHO")
          .replace(/TO?[,\s]TO?/gim, "..TO_TO")

          .replace(/CHAN[,\s\.]LE/gim, "..CL")
          .replace(/CHAN[,\s\.]CHAN/gim, "..CC")
          .replace(/LE[,\s\.]CHAN/gim, "..LC")
          .replace(/LE[,\s\.]LE/gim, "..LL")

          .replace(/LO[,\.\s]?(XIEN|XN)/gim, "$1")
          .replace(/L0?[\s\.](\d+)/gim, "..LO $1") //  L0 | L => LO
          .replace(/L[\s\.]?(\d+)/gim, "..LO $1") //  L030 => LO 030
          .replace(/[\.\s]+?\D+$/g, "") // remove last word if last word is not a number
          .replace(/[()\\\/]/gim, ".")

          // replace everything else
          .replace(/(CHO|CH0|NHE|OK|THUONG|DIEM|GHI|HO)[\s\.]+?/gim, "")
      );
  };

  const handleFirstIputChange = (e) => {
    setFirstInput(e.target.value);
  };

  const splitSMS = () => {
    if (!firstInput) return;
    const x_plus_digit_handle = firstInput.replace(
      /(X\d+[\s\.,]+?)X(\d)/gim,
      "$1 XQ$2 "
    ); // 54X50 X4 => 54X50 XQ4

    const arr = x_plus_digit_handle
      .split(/(.*?x[\.\s,]*?\d+)/gim)
      .filter((e) => e);
    const index: number[] = [];
    arr.forEach((e, i) => {
      arr[i] =
        e &&
        e
          .replace(/^[\.\s]?[NDK]?[,\.\s]+/gim, "")
          .replace(/-(\w+)/gim, "$1")
          .replace(/[-()]/, ".");

      keywords.forEach((k) => {
        if (arr[i].includes(k.toUpperCase())) {
          index.push(i);
        }
      });
    });

    const arr2 = [];
    for (let i = 0; i < index.length; i++) {
      arr2.push(arr.slice(index[i], index[i + 1]).join(".."));
    }

    arr2.forEach((a, i) => {
      arr2[i] = a
        .replace(/^[^L|X|D|B|K]+/gim, "")
        .replace(/XQ?[\s\.](\d{1})[:;,\.\s]/gim, "XQ$1 ")
        .replace(/,\s?|-/gim, ".");
    });

    let arr3 = [];

    let head = "";
    arr2.forEach((a, i) => {
      const temp = a.split(/(.*?x[\.\s,]*?\d+)/gim).filter((e) => e);

      if (a.match(/XIEN?[\.\s,]?XN?|XIEN|XN|DE|LO|XQ|BC/)) {
        head = a.match(/XIEN?[\.\s,]?XN?|XIEN|XN|DE|LO|XQ|BC/)[0];
      }

      temp.forEach((t) => {
        if (
          !t.includes("XIEN") &&
          !t.includes("XN") &&
          !t.includes("LO") &&
          !t.includes("DE") &&
          !t.includes("BC") &&
          !t.includes("XQ")
        ) {
          arr3.push(head + t);
        } else {
          arr3.push(t);
        }
      });
    });

    arr3.forEach((a, i) => {
      const check = [];
      keywords.forEach((k) => {
        const head = k.toUpperCase();
        if (a.split(head).length > 2) {
          check.push(i);
        }
      });

      if (check.length > 0 || a.includes("VA") || a.includes("&")) {
        const group = a.split(/DE|LO|XIEN|XN|XQ|VA|&/).filter((g) => g);
        const price = a.replace(/X(\d+)/gim, "-$1").split("-")[1];
        let head = "";
        keywords.forEach((k) => {
          if (a.includes(k.toUpperCase())) {
            head = k.toUpperCase();
          }
        });

        group.forEach((g) => {
          const number = g.replace(/X\d+|\.\./gim, "");
          const str = head + ".." + number + "X" + price;
          arr3.push(str);
        });

        arr3[i] = null;
      }
    });

    arr3.forEach((a, i) => {
      const price = a.replace(/X(\d+)/gim, "-$1").split("-")[1];
      if (price) {
        const group = a
          .replace(/(XN|XQ\d?|LO|DE|XIEN|QUAY)[.\,\.\s]+/gim, "")
          .split("X")
          .filter((g) => g);
        if (group.length < 2) {
          const group2 = arr[i - 1]
            .replace(/(XIEN?[,\.\s]?(XN|QUAY)?|XQ\d|XN|LO|DE)[,\s\.]+/gim, "")
            .split("X")[0]
            .split(".")
            .filter((g) => g);

          // console.log(group2)
          const temp = [];
          group2.forEach((g) => {
            if (g.replace(/[\s\.]?(\d+)[\s\.]?/gim, "$1").length > 2) {
              temp.push(g.substring(0, 2));
              temp.push(g.substring(1, 3));
            } else {
              temp.push(g);
            }
          });

          if (a.includes("XQ3")) {
            const temp2 = chunk(temp, 3);
            temp2.forEach((t) => {
              arr3.push("XQ3." + t.join(".") + "-" + price);
            });
          } else if (a.includes("XQ4")) {
            const temp2 = chunk(temp, 4);
            temp2.forEach((t) => {
              arr3.push("XQ4." + t.join(".") + "-" + price);
            });
          } else if (a.includes("XN") || a.includes("XQ")) {
            const temp2 = chunk(temp, 2);
            temp2.forEach((t) => {
              if (a.includes("XN")) {
                arr3.push("XN." + t.join(".") + "-" + price);
              }

              if (a.includes("XQ")) {
                arr3.push("XQ." + t.join(".") + "-" + price);
              }
            });
          } else if (a.includes("XIEN")) {
            arr3.push("XIEN." + temp.join(".") + "-" + price);
          } else if (a.includes("DE")) {
            arr3.push("DE." + temp.join(".") + "-" + price);
          } else if (a.includes("LO")) {
            arr3.push("LO." + temp.join(".") + "-" + price);
          }

          arr3[i] = null;
        }
      }
    });

    arr3 = arr3.filter((a) => a);

    arr3.forEach((a, i) => {
      // handle XIEN.XN
      if (a.includes("XIEN") && a.includes("XN")) {
        const price = a.replace(/X(\d+)/gim, "-$1").split("-")[1];
        const group = a
          .replace(/XIEN[.\,\.\s]+XN[.\,\.\s]+/gim, "")
          .split("X")[0]
          .split(".")
          .filter((g) => g);

        const temp = [];
        group.forEach((g, gi) => {
          if (g.replace(/[\s\.]?(\d+)[\s\.]?/gim, "$1").length > 2) {
            temp.push(g.substring(0, 2));
            temp.push(g.substring(1, 3));
          } else {
            temp.push(g);
          }
        });

        const temp2 = chunk(temp, 2);
        temp2.forEach((t) => {
          arr3.push("XIEN.XN " + t.join(".") + "-" + price);
        });

        arr3[i] = null;
      }

      if (a.includes("N_TO")) {
        arr3[i] = a.replace("N_TO", ntt.join("."));
      }

      if (a.includes("TO_TO")) {
        arr3[i] = a.replace("TO_TO", ttt.join("."));
      }

      if (a.includes("TO_N")) {
        arr3[i] = a.replace("TO_N", tnn.join("."));
      }

      if (a.includes("N_N")) {
        arr3[i] = a.replace("N_N", nnn.join("."));
      }

      if (a.includes("CL")) {
        arr3[i] = a.replace("CL", cll.join("."));
      }

      if (a.includes("CC")) {
        arr3[i] = a.replace("CC", ccc.join("."));
      }

      if (a.includes("LC")) {
        arr3[i] = a.replace("LC", lcc.join("."));
      }

      if (a.includes("LL")) {
        arr3[i] = a.replace("LL", lll.join("."));
      }
    });

    arr3 = arr3.filter((e) => /\d/.test(e));

    // console.log(arr3)

    setAnalyzeInput(arr3);

    let str = "";
    arr3.forEach((s) => {
      // if ( ! s.includes( 'XI' )
      // 	&& ! s.includes( 'XQ' )
      // 	&& ! s.includes( 'XN' )
      // 	&& (
      // 		! s.split( 'X' )[0].match( /\d/ )
      // 		&& ( ! s.includes( 'KEP' ) && ! s.includes( 'KL' ) )
      // 		)
      // 	) {
      // 	str += '<p>' + s + '<span class="hit">---&gt;(ko hieu)</span>' + '</p>'
      // } else {
      str += '<p class="break-words mb-2">' + s + "</p>";
      // }
    });
    setSecondInput(str);
  };

  const handleLo = (input) => {
    // step 4 - data analized
    for (let i = 0; i < input.length; i++) {
      if (!/\d/.test(input[i])) {
        input[i] = null;
      } else {
        input[i] = input[i].replace(/[ ,]/gm, ".");
      }
    }

    input = input.filter((e) => e);

    input.forEach((e, i) => {
      const price = "-" + e.split("-")[1];
      const temp = e
        .split("-")[0]
        .split(".")
        .filter((e) => e);

      temp.forEach((t, i) => {
        if (t.length > 2) {
          temp.push(t.substring(0, 2));
          temp.push(t.substring(1, 3));
          temp[i] = null;
        }
      });

      input[i] = temp.filter((t) => t).join(".") + price;
    });

    setLo(input);

    let textLo = "";
    input.forEach((e) => {
      let textLo1 = "<p>";
      const arr = e.split("-")[0].split(".");
      arr.forEach((a) => {
        if (countOccurrences(lo_kq, a) > 1) {
          textLo1 += `<span class="${
            lo_kq.includes(a) ? "font-bold text-rose-500" : ""
          }">${a} (x${countOccurrences(lo_kq, a)})</span>.`;
        } else {
          textLo1 += `<span class="${
            lo_kq.includes(a) ? "font-bold text-rose-500" : ""
          }">${a}</span>.`;
        }
      });

      textLo1 += `-<span class="font-bold">${e.split("-")[1]}</span></p>`;
      textLo += textLo1.replace(/\.-/gim, "-");
    });
    setFinalLo(textLo);
  };

  const handleDe = (input) => {
    // step 4 - data analized
    for (let i = 0; i < input.length; i++) {
      input[i] = input[i]
        .replace(/KEP[,\.\s]+?KL/gim, ".KEP,KL")
        .replace(/DE[,\.\s]?K(EP)/gim, ".KEP")
        .replace(/[\s,]/gm, ".")
        .replace(/[\.\s]-[\.\s]/gim, "-")
        .replace(/BO[\.\s]/gim, ".BO")
        .replace(/DD[\.\s]|DAU[,\.\s]DIT/gim, ".DD")
        .replace(/DAU[\.\s]/gim, ".DAU")
        .replace(/DIT[\.\s]/gim, ".DIT")
        .replace(/TONG[\.\s]/gim, ".TONG")
        .replace(/CHAM/gim, "DINH")
        .replace(/[\.\s]?DITDE/gim, "") // bug - DIT auto generate in every line????
        .replace(/[\.\s]?DE[\.\s]?/gim, ""); // bug
    }

    input = input.filter((e) => e);
    input.forEach((e, i) => {
      const price = "-" + e.split("-")[1];

      if (
        !e.includes("DD") &&
        !e.includes("DAU") &&
        !e.includes("DIT") &&
        !e.includes("BO") &&
        !e.includes("T") &&
        !e.includes("KEP") &&
        !e.includes("KL") &&
        !e.includes("DINH")
      ) {
        const tempDe = e
          .split("-")[0]
          .split(".")
          .filter((e) => e);
        tempDe.forEach((t, i) => {
          if (t.length > 2) {
            tempDe.push(t.substring(0, 2));
            tempDe.push(t.substring(1, 3));
            tempDe[i] = null;
          }
        });

        input[i] =
          tempDe
            .filter((t) => t)
            .join(".")
            .replace(/,/gim, ".") + price;
      }

      if (e.includes("BO")) {
        const strRemove_Bo = e
          .replace(/[\.\s]+?BO[\.\s]+?/gim, "")
          .replace(/BO/gim, "");
        const tempDe = strRemove_Bo
          .split("-")[0]
          .split(".")
          .filter((e) => e);
        const tempDe2 = [];
        tempDe.forEach((t) => {
          bo.forEach((b) => {
            if (b.includes(t)) {
              tempDe2.push(b);
            }
          });
        });

        input[i] = tempDe2.join(".").replace(/,/gim, ".") + price;
      }

      if (e.includes("DINH")) {
        const strRemove_DINH = e.replace(/[\.]DINH[\.]/gim, "");
        const tempDe = strRemove_DINH
          .split("-")[0]
          .split(/[,\.]/gim)
          .filter((e) => e);

        const tempDe2 = [];
        tempDe.forEach((t) => {
          dinh.forEach((b) => {
            if (t.includes(b.title)) {
              tempDe2.push(b.data);
            }
          });
        });

        input[i] = tempDe2.join(".").replace(/,/gim, ".") + price;
      }

      if (e.includes("KEP") || e.includes("KL")) {
        const tempDe = e
          .split("-")[0]
          .split(/[,\.]/gim)
          .filter((e) => e);
        const tempDe2 = [];
        tempDe.forEach((e) => {
          if (e === "KEP") {
            tempDe2.push(kep.join("."));
          }

          if (e === "KL") {
            tempDe2.push(kl.join("."));
          }
        });

        input[i] = tempDe2.join(".").replace(/,/gim, ".") + price;
      }

      if (e.includes("TONG")) {
        const strRemove_Tong = e.replace(/[\.]TONG[\.]/gim, "");
        const tempDe = strRemove_Tong
          .split("-")[0]
          .split(".")
          .filter((e) => e);
        const tempDe2 = [];

        tempDe.forEach((t) => {
          const remove_tong = t.replace("TONG", "");
          tong.forEach((b) => {
            if (remove_tong.includes(b.title.toUpperCase())) {
              tempDe2.push(b.data);
            }
          });
        });

        input[i] = tempDe2.join(".").replace(/,/gim, ".") + price;
      }

      if (e.includes("DAU")) {
        const strRemove_DAU = e.replace(/[\.]DAU[\.]/gim, "");
        const tempDe = strRemove_DAU
          .split("-")[0]
          .split(".")
          .filter((e) => e);
        const tempDe2 = [];
        tempDe.forEach((t) => {
          dau.forEach((b) => {
            if (t.includes(b.title)) {
              tempDe2.push(b.data);
            }
          });
        });

        input[i] = tempDe2.join(".").replace(/,/gim, ".") + price;
      }

      if (e.includes("DIT")) {
        const strRemove_DIT = e.replace(/[\.]DIT[\.]/gim, "");
        const tempDe = strRemove_DIT
          .split("-")[0]
          .split(".")
          .filter((e) => e);
        const tempDe2 = [];
        tempDe.forEach((t) => {
          dit.forEach((b) => {
            if (t.includes(b.title)) {
              tempDe2.push(b.data);
            }
          });
        });

        input[i] = tempDe2.join(".").replace(/,/gim, ".") + price;
      }

      if (e.includes("DD")) {
        const strRemove_DD = e.replace(/[\.]DD[\.]/gim, "");
        const tempDe = strRemove_DD
          .split("-")[0]
          .split(".")
          .filter((e) => e);
        const tempDe2 = [];
        tempDe.forEach((t) => {
          dau.forEach((b) => {
            if (t.includes(b.title)) {
              tempDe2.push(b.data);
            }
          });

          dit.forEach((b) => {
            if (t.includes(b.title)) {
              tempDe2.push(b.data);
            }
          });
        });

        input[i] = tempDe2.join(".").replace(/,/gim, ".") + price;
      }
    });

    input.forEach((e, i) => {
      if (!/\d/.test(e)) {
        input[i] = null;
      }
    });

    input = input.filter((e) => e);

    setDe(input);

    let textDe = "";
    input.forEach((e) => {
      let textDe1 = "<p>";
      const arr = e.split("-")[0].split(".");
      arr.forEach((a) => {
        textDe1 += `<span class="${
          de_kq.includes(a) ? "font-bold text-rose-500" : ""
        }">${a}</span>.`;
      });

      textDe1 += `-<span class="font-bold">${e.split("-")[1]}</span></p>`;
      textDe += textDe1.replace(/\.-/gim, "-");
    });
    setFinalDe(textDe);
  };

  const handleBC = (input) => {
    // step 4 - data analized
    for (let i = 0; i < input.length; i++) {
      input[i] = input[i].replace(/[,\s]/gm, ".").replace(/ -|- |-\./gm, "-");
    }

    for (let i = 0; i < input.length; i++) {
      input[i] = input[i]
        .replace(/\s/gm, ".")
        .replace("[,N]", "")
        .replace(/ -|- |-\./, "-");
    }

    const newBC = input
      .join()
      .split(/[,\.]+/)
      .filter((e) => e);
    for (let i = newBC.length - 1; i >= 0; i--) {
      if (!newBC[i].split("-")[1]) {
        newBC[i] = newBC[i] + "-" + newBC[i + 1].split("-")[1];
      }
    }

    setBC(newBC);

    let textBC = "";
    newBC.forEach(
      (e) =>
        (textBC += `<p class="${
          bc_kq.includes(e.split("-")[0]) ? "font-bold text-rose-500" : ""
        }">${e}</p>`)
    );
    setFinalBC(textBC);
  };

  const handleXien = (input) => {
    // step 4 - data analized
    for (let i = 0; i < input.length; i++) {
      input[i] = input[i].replace(/[ ,]/gm, ".");
    }

    input.forEach((e, i) => {
      const price = "-" + e.split("-")[1];
      const temp = e
        .split("-")[0]
        .split(".")
        .filter((e) => e);

      temp.forEach((t, i) => {
        if (t.length > 2) {
          temp.push(t.substring(0, 2));
          temp.push(t.substring(1, 3));
          temp[i] = null;
        }
      });

      input[i] = temp.filter((t) => t).join(".") + price;
    });

    setXien(input);

    let textXien = "";
    input.forEach((e) => {
      const arr = e.split("-")[0].split(".");
      textXien += `<p class="${
        e.includes("undefined") ? "font-bold text-rose-500" : ""
      }${
        calculateXien(arr, lo_kq) === arr.length
          ? "font-bold text-rose-500"
          : ""
      }">${e}</p>`;
    });
    setFinalXien(textXien);
  };

  const handleXN = (input) => {
    // step 4 - data analized
    for (let i = 0; i < input.length; i++) {
      input[i] = input[i].replace(/[ ,]/gm, ".");
    }

    input.forEach((e, i) => {
      const price = "-" + e.split("-")[1];

      if (e.match(/\.\./gim)) {
        const temp = e.split("-")[0].split(/\.\./gim);
        temp.forEach((tt, ii) => {
          if (tt) {
            if (tt.length < 3) {
              input.push(tt + "." + temp[ii + 1] + price);
              temp[ii + 1] = null;
            } else {
              input.push(tt + price);
            }
          }
        });

        input[i] = null;
      }
    });

    input = input.filter((e) => e);

    input.forEach((e, i) => {
      const price = "-" + e.split("-")[1];
      const temp = e
        .split("-")[0]
        .split(".")
        .filter((e) => e);

      temp.forEach((t, i) => {
        if (t.length > 2) {
          temp.push(t.substring(0, 2));
          temp.push(t.substring(1, 3));
          temp[i] = null;
        }
      });

      input[i] = temp.filter((tt) => tt).join(".") + price;
    });

    setXienNhay(input);

    let textXN = "";
    input.forEach(
      (e) =>
        (textXN += `<p class="${
          e.includes("undefined") ? "font-bold text-rose-500" : ""
        }${
          calculateXien(lo_kq, e.split("-")[0].split(".")) > 1
            ? "font-bold text-rose-500"
            : ""
        }">${e}</p>`)
    );
    setFinalXN(textXN);
  };

  const handleXQ = (input) => {
    // step 4 - data analized
    for (let i = 0; i < input.length; i++) {
      input[i] = input[i]
        .replace(/[\s,]/gm, ".")
        .replace(/X[,\.\s]?(\d+)/gim, "-$1");
      // .replace( /-(Q\d)/gmi, '$1'  )
    }

    let temp = [];
    input.forEach((e) => {
      if (e.includes("Q2") || e.includes("Q3") || e.includes("Q4")) {
        for (let x = 1; x < 5; x++) {
          const xq = "XQ" + x;
          if (e.includes(xq)) {
            const price = "-" + e.split("-")[1];
            let numbers = e.replace(xq, "").split("-")[0].split(".");

            numbers = numbers.filter((e) => e);
            numbers.forEach((n, i) => {
              if (n.length > 2) {
                numbers.push(n.substring(0, 2));
                numbers.push(n.substring(1, 3));
                numbers[i] = null;
              }
            });

            numbers = numbers.filter((n) => n);

            if (numbers.length > x) {
              const chunks = chunk(numbers, x);
              chunks.forEach((c) => {
                temp.push(c.join(".") + price);
              });
            } else {
              temp.push(numbers.join(".") + price);
            }

            temp = temp.filter((el) => el);
          }
        }
      } else {
        const price = "-" + e.split("-")[1];

        if (e.match(/\.\./gim) && e.split(/\.\./gim).length > 4) {
          e.split(/\.\./gim).forEach((tt) => {
            temp.push(tt + price);
          });
        } else {
          const numbers = e.split("-")[0].replace(/XQ/, "").split(".");
          numbers.forEach((n, i) => {
            if (n.length > 2) {
              numbers.push(n.substring(0, 2));
              numbers.push(n.substring(1, 3));
              numbers[i] = null;
            }
          });

          temp.push(numbers.filter((e) => e).join(".") + price);
        }
      }
    });

    temp = temp.filter((e) => e);

    setXienQuay(temp);

    let textXQ = "";
    temp.forEach((e) => {
      const arr = e.split("-")[0].split(".");
      const hit =
        calculateXien(arr, lo_kq) > 1
          ? `<span class="font-bold text-rose-500">(${calculateXien(
              arr,
              lo_kq
            )} con)</span>`
          : "";
      textXQ += `<p class="${
        e.includes("undefined") ? "font-bold text-rose-500" : ""
      }">${e} ${hit}</p>`;
    });
    setFinalXQ(textXQ);
  };

  const handleAnalyze = () => {
    // step 3
    if (!analyzeInput) return;

    const tempLo = [],
      tempDe = [],
      tempBC = [],
      tempXien = [],
      tempXN = [],
      tempXienquay = [];

    analyzeInput.forEach((input, i) => {
      if (/X(\w+)?[\s\.+]?Q/gim.test(input)) {
        tempXienquay.push(input.replace(/(XQ)+[,\.\s]+/, ""));
      } else {
        switch (input[0]) {
          case "L":
            tempLo.push(
              input
                .replace(/LO|L0/, "")
                .replace(/[\s\.]?X[\.\s]?|\*/gim, "-")
                .replace(/[\s,]/gim, ".")
            );
            break;
          case "D":
          case "K":
            tempDe.push(
              input
                .replace(/[\s\.]?X[\.\s]?|\*/gim, "-")
                .replace(/[\s]/gim, ".")
            );
            break;
          case "B":
            tempBC.push(
              input
                .replace(/BC/, "")
                .replace(/[\s\.]?X[\.\s]?|\*/gim, "-")
                .replace(/[\s,]/gim, ".")
            );
            break;
          default:
            // if ( input.length < 6 ) {
            // 	input += analyzeInput[i+1]
            // 	analyzeInput.splice( 0, i+1 )
            // }
            if (input.includes("XN") && input.includes("XIEN")) {
              tempXien.push(
                input
                  .replace(/XIEN[,\.\s]+?XN|XN[,\.\s]?XIEN/gim, "")
                  .replace(/[\s\.]?X[\.\s]?|\*/gim, "-")
                  .replace(/[\s,]/gim, ".")
              );
              tempXN.push(
                input
                  .replace(/XIEN[,\.\s]+?XN|XN[,\.\s]?XIEN/gim, "")
                  .replace(/[\s\.]?X[\.\s]?|\*/gim, "-")
                  .replace(/[\s,]/gim, ".")
              );
            } else if (input.includes("XN") && !input.includes("XIEN")) {
              tempXN.push(
                input
                  .replace(/XN[,\.\s]+?/, "")
                  .replace(/[\s\.]?X[\.\s]?|\*/gim, "-")
                  .replace(/[\s,]/gim, ".")
              );
            } else {
              tempXien.push(
                input
                  .replace(/XIEN[,\.\s]+?/, "")
                  .replace(/[\s\.]?X[\.\s]?|\*/gim, "-")
                  .replace(/[\s,]/gim, ".")
              );
            }
            break;
        }
      }
    });

    handleLo(tempLo);
    handleDe(tempDe);
    handleBC(tempBC);
    handleXien(tempXien);
    handleXN(tempXN);
    handleXQ(tempXienquay);
  };

  const handleXBC = (e) => {
    setXBC(parseFloat(e.target.value));
  };

  const handleXLo = (e) => {
    setXLo(parseFloat(e.target.value));
  };

  const handleXDe = (e) => {
    setXDe(parseFloat(e.target.value));
  };

  const handleXXien = (e) => {
    setXXien(parseFloat(e.target.value));
  };

  const handleXXN = (e) => {
    setXXN(parseFloat(e.target.value));
  };

  const handleCalculate = () => {
    let tempLo = 0;
    let hitLo = 0;
    lo.forEach((l) => {
      let s1 = l.split("-")[1];
      let s2 = l.split("-")[0].split(".");
      tempLo += s2.length * parseFloat(s1);

      s2.forEach((s) => {
        hitLo += countOccurrences(lo_kq, s) * parseFloat(s1);
      });
    });
    setTongLo(tempLo);
    setTongLoHit(hitLo * 80);

    let tempDe = 0;
    let hitDe = 0;
    de.forEach((d) => {
      let s1 = d.split("-")[1];
      let s2 = d.split("-")[0].split(".");
      tempDe += s2.length * parseFloat(s1);

      s2.forEach((s) => {
        if (de_kq === s) {
          hitDe += parseFloat(s1);
        }
      });
    });
    setTongDe(tempDe);
    setTongDeHit(xDe === 1 ? hitDe * 90 : hitDe * 70);

    let tempBC = 0;
    let hitBC = 0;
    bc.forEach((d) => {
      let s1 = d.split("-")[1];
      let s2 = d.split("-")[0].split(".");
      tempBC += s2.length * parseFloat(s1);

      s2.forEach((s) => {
        if (bc_kq === s) {
          hitBC += parseFloat(s1);
        }
      });
    });
    setTongBC(tempBC);
    setTongBCHit(hitBC * 400);

    let tempXien = 0;
    let hitXien = 0;

    xien.forEach((d) => {
      const price = parseFloat(d.split("-")[1]);
      tempXien += price;

      const xxx = d.split("-")[0].split(".");
      if (calculateXien(xxx, lo_kq) === xxx.length) {
        if (xxx.length === 2) {
          hitXien += price * 10;
        }
        if (xxx.length === 3) {
          hitXien += price * 40;
        }
        if (xxx.length === 4) {
          hitXien += price * 100;
        }
      }
    });
    setTongXien(tempXien);
    setTongXienHit(hitXien);

    let tempXN = 0;
    let hitXN = 0;
    console.log(xiennhay);
    xiennhay.forEach((d) => {
      const price = parseFloat(d.split("-")[1]);
      tempXN += price;

      const xxx = d.split("-")[0].split(".");
      console.log(lo_kq);
      console.log(xxx);
      if (calculateXN(xxx, lo_kq) >= xxx.length) {
        hitXN += price * 10;
      }
    });
    setTongXN(tempXN);
    setTongXNHit(hitXN);

    let tempXQ = 0;
    let hitXQ = 0;
    xienquay.forEach((d) => {
      const danh = calculateXien(d.split("-")[0].split("."), lo_kq);
      anXQ.forEach((a) => {
        if (a.xien === danh) {
          hitXQ += parseFloat(d.split("-")[1]) * parseFloat(a.an.split("-")[1]);
        }
      });

      anXQ.forEach((a) => {
        if (a.xien === d.split("-")[0].split(".").length) {
          tempXQ +=
            parseFloat(d.split("-")[1]) * parseFloat(a.an.split("-")[0]);
        }
      });
    });
    setTongXQ(tempXQ);
    setTongXQHit(hitXQ);

    handleFinalResult();
  };

  const handleFinalResult = useCallback(() => {
    setFinalResult(`<br/>
			<h3 class="text-xl font-bold">Lô: ${Math.round(tongLo * 100) / 100} = ${
      Math.round(tongLo * xLo * 100) / 100
    }/<span class="text-rose-500">${
      Math.round(tongLoHit * 1000) / 1000
    }</span> = <span class="text-3xl">${
      Math.round((tongLo * xLo - tongLoHit) * 1000) / 1000
    }</span></h3>
			<h3 class="text-xl font-bold">Đề: ${Math.round(tongDe * 100) / 100} = ${
      Math.round(tongDe * xDe * 100) / 100
    }/<span class="text-rose-500">${
      Math.round(tongDeHit * 1000) / 1000
    }</span> = <span class="text-3xl">${
      Math.round((tongDe * xDe - tongDeHit) * 1000) / 1000
    }</span></h3>
			<h3 class="text-xl font-bold">BC: ${Math.round(tongBC * 100) / 100} = ${
      Math.round(tongBC * xBC * 100) / 100
    }/<span class="text-rose-500">${
      Math.round(tongBCHit * 1000) / 1000
    }</span> = <span class="text-3xl">${
      Math.round((tongBC * xBC - tongBCHit) * 1000) / 1000
    }</span></h3>
			<h3 class="text-xl font-bold">X : ${Math.round(tongXien * 100) / 100} = ${
      Math.round(tongXien * xXien * 100) / 100
    }/<span class="text-rose-500">${
      Math.round(tongXienHit * 1000) / 1000
    }</span> = <span class="text-3xl">${
      Math.round((tongXien * xXien - tongXienHit) * 1000) / 1000
    }</h3>
			<h3 class="text-xl font-bold">XN: ${Math.round(tongXN * 100) / 100} = ${
      Math.round(tongXN * xXN * 100) / 100
    }/<span class="text-rose-500">${
      Math.round(tongXNHit * 1000) / 1000
    }</span> = <span class="text-3xl">${
      Math.round((tongXN * xXN - tongXNHit) * 1000) / 1000
    }</h3>
			<h3 class="text-xl font-bold">XQ: ${Math.round(tongXQ * 100) / 100} = ${
      Math.round(tongXQ * xXien * 100) / 100
    }/<span class="text-rose-500">${
      Math.round(tongXQHit * 1000) / 1000
    }</span> = <span class="text-3xl">${
      Math.round((tongXQ * xXien - tongXQHit) * 1000) / 1000
    }</span></h3>
			<br>
			<h2>
				<span class="text-2xl font-bold">TỔNG = </span>
				<span class="text-rose-500 text-3xl font-bold">
					${
            Math.round(
              (tongLo * xLo +
                tongDe * xDe +
                tongBC * xBC +
                tongXien * xXien +
                tongXN * xXN +
                tongXQ * xXien -
                tongLoHit -
                tongDeHit -
                tongBCHit -
                tongXienHit -
                tongXNHit -
                tongXQHit) *
                1000
            ) / 1000
          }
				</span>
			</h2>

			<h2 class="text-rose-500 font-bold text-3xl">Khách =
				${
          Math.round(
            0 -
              (tongLo * xLo +
                tongDe * xDe +
                tongBC * xBC +
                tongXien * xXien +
                tongXN * xXN +
                tongXQ * xXien -
                tongLoHit -
                tongDeHit -
                tongBCHit -
                tongXienHit -
                tongXNHit -
                tongXQHit) *
                1000
          ) / 1000
        }
			</h2>
		`);
  }, [
    tongBC,
    tongBCHit,
    tongDe,
    tongDeHit,
    tongLo,
    tongLoHit,
    tongXN,
    tongXNHit,
    tongXQ,
    tongXQHit,
    tongXien,
    tongXienHit,
    xBC,
    xDe,
    xLo,
    xXN,
    xXien,
  ]);

  useEffect(() => {
    handleFinalResult();
  }, [
    handleFinalResult,
    tongBC,
    tongBCHit,
    tongDe,
    tongDeHit,
    tongLo,
    tongLoHit,
    tongXN,
    tongXNHit,
    tongXQ,
    tongXQHit,
    tongXien,
    tongXienHit,
    xBC,
    xDe,
    xLo,
    xXN,
    xXien,
  ]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="App p-5">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-5">
            <div className="flex-initial w-1/6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Source:
              </label>
              <select
                value={selectedApi}
                onChange={(e) => setSelectedApi(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              >
                <option value="xskt-net">XSKT.net</option>
                <option value="kqxs-vn">KQXS.vn</option>
              </select>
            </div>
            <div className="flex-initial w-1/6">
              <Select obj={dataLo} cb={handleXLo} />
            </div>
            <div className="flex-initial w-1/6">
              <Select obj={dataDe} cb={handleXDe} />
            </div>
            <div className="flex-initial w-1/6">
              <Select obj={dataXien} cb={handleXXien} />
            </div>
            <div className="flex-initial w-1/6">
              <Select obj={dataXienNhay} cb={handleXXN} />
            </div>
            <div className="flex-initial w-1/6">
              <Select obj={dataBaCang} cb={handleXBC} />
            </div>
          </div>

          <p>
            3 càng: <span className="text-rose-500 font-bold">{bc_kq}</span>
          </p>
          <p>
            Đề: <span className="text-rose-500 font-bold">{de_kq}</span>
          </p>
          <p>Lô: {loHtml}</p>

          <div className="flex mt-5 mb-5 gap-5">
            <div className="flex-initial w-1/2">
              <textarea
                className="p-2 border-solid border-2 border-black-600 rounded-sm w-full h-80 bg-gray-50 overflow-y-scroll"
                value={firstInput}
                onChange={handleFirstIputChange}
              ></textarea>
            </div>
            <div className="flex-initial w-1/2">
              <div
                className="p-2 border-solid border-2 border-black-600 rounded-sm w-full h-80 bg-gray-50 overflow-y-scroll"
                dangerouslySetInnerHTML={{ __html: secondInput }}
              ></div>
            </div>
          </div>

          <button
            className="bg-violet-500 px-7 py-3 text-white rounded-sm mr-9"
            onClick={handlePaste}
          >
            Dán
          </button>
          {firstInput && (
            <button
              className="bg-yellow-900 px-7 py-3 text-white rounded-sm mr-9"
              onClick={splitSMS}
            >
              Tách tin
            </button>
          )}

          {secondInput && (
            <button
              className="bg-orange-500 px-7 py-3 text-white rounded-sm mr-9"
              onClick={handleAnalyze}
            >
              Phân tích
            </button>
          )}

          {(finalDe ||
            finalLo ||
            finalXien ||
            finalXQ ||
            finalXN ||
            finalBC) && (
            <button
              className="bg-rose-500 px-7 py-3 text-white rounded-sm"
              onClick={handleCalculate}
            >
              Tính điểm
            </button>
          )}

          <div className="flex gap-10">
            <div className="flex-initial w-1/2">
              {finalDe && (
                <>
                  <h3 className="text-xl font-bold mt-5">Đề</h3>
                  <div
                    className="break-words"
                    dangerouslySetInnerHTML={{ __html: finalDe }}
                  />
                </>
              )}

              {finalBC && (
                <>
                  <h3 className="text-xl font-bold mt-5">Ba càng</h3>
                  <div
                    className="break-words"
                    dangerouslySetInnerHTML={{ __html: finalBC }}
                  />
                </>
              )}

              {finalLo && (
                <>
                  <h3 className="text-xl font-bold mt-5">Lô</h3>
                  <div
                    className="break-words"
                    dangerouslySetInnerHTML={{ __html: finalLo }}
                  />
                </>
              )}

              {finalXien && (
                <>
                  <h3 className="text-xl font-bold mt-5">Xiên</h3>
                  <div
                    className="break-words"
                    dangerouslySetInnerHTML={{ __html: finalXien }}
                  />
                </>
              )}

              {finalXQ && (
                <>
                  <h3 className="text-xl font-bold mt-5">Xiên quay</h3>
                  <div
                    className="break-words"
                    dangerouslySetInnerHTML={{ __html: finalXQ }}
                  />
                </>
              )}

              {finalXN && (
                <>
                  <h3 className="text-xl font-bold mt-5">Xiên nháy</h3>
                  <div
                    className="break-words"
                    dangerouslySetInnerHTML={{ __html: finalXN }}
                  />
                </>
              )}
            </div>

            <div className="flex-initial w-1/2">
              <div
                className="final-calculate"
                dangerouslySetInnerHTML={{ __html: finalResult }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
