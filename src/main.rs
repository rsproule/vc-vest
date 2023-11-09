use anyhow::Result;
use ethers::types::Address;
use polars::prelude::{expr, DataFrame, ParquetReader};

#[tokio::main]
async fn main() -> Result<()> {
    Ok(())
}

    let df = ParquetReader::